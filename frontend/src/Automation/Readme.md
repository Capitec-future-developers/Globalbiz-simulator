# Automation, ported to React

This is a React port of the original `Automation.js` / `Computer-Automation.js`
vanilla-JS guided-walkthrough engine (search a command → it highlights and
clicks/fills the right elements on screen, with play/pause/rewind/forward,
autopilot, optional speech, and a settings panel).

## Files

- `automationCommands.js` / `appRouteCommands.js` – command dictionaries.
  `appRouteCommands.js` is the one wired up to this project's actual React
  Router paths (see App.jsx); `automationCommands.js` holds the original
  multi-page-site command sets (`appCommands`, `computerCommands`) for
  reference.
- `automationUtils.js` – pure helpers (fuzzy match score, human-readable step
  labels, color conversion, speech synthesis wrapper).
- `useAutomation.js` – the engine itself, as a hook. Owns all the state and
  timing logic; renders nothing.
- `AutomationContext.jsx` – `AutomationProvider` + `useAutomationContext()`.
  Since the search box lives in `AppHeader` but the controls/transcript/
  highlight overlay live elsewhere, both need to read from the SAME running
  automation instance — this context is what makes that possible. Only ever
  call `useAutomation()` once, inside `AutomationProvider`; everything else
  should go through `useAutomationContext()`.
- `AutomationOverlay.jsx` + `automation.css` – the floating controls,
  settings gear, transcript, toast, and highlight box. No search box here
  anymore — that's `AppHeader`'s job.

## Quick start (this project)

`App.jsx` wraps the whole route tree in `AutomationProvider` and mounts
`AutomationOverlay` once as a sibling of `<Routes>`:

```jsx
<AutomationProvider commands={appRouteCommands} onNavigate={navigate}>
  <Routes>{/* ... */}</Routes>
  <AutomationOverlay />
</AutomationProvider>
```

`AppHeader` (rendered inside the route tree, so it's a descendant of the
provider) wires its existing search input/button/dropdown to the shared
instance via `useAutomationContext()` — see `components/AppHeader.jsx`.

If you want the old drop-in-everywhere version (own search box, no
context), you can still call `useAutomation()` directly from a single
component — just don't do that AND use `AutomationProvider` in the same
tree, or you'll get two independent engines.

## Using just the hook (custom UI)

```jsx
import { useAutomation } from './automation/useAutomation';

function MyOwnAutomationBar() {
    const { search, suggestions, executeCommand, isRunning, currentStepIndex, totalSteps } =
        useAutomation({ context: 'app' });

    return (
        <div>
            <input onChange={(e) => search(e.target.value)} onKeyDown={(e) => {
                if (e.key === 'Enter') executeCommand(e.target.value);
            }} />
            {suggestions.map((s) => (
                <div key={s.name} onClick={() => executeCommand(s.name)}>{s.name}</div>
            ))}
            {isRunning && <p>Step {currentStepIndex + 1} of {totalSteps}</p>}
        </div>
    );
}
```

## Notable behavior changes from the original scripts

- **`isTerminating` race guard** (from `Computer-Automation.js`) is kept
  throughout, so hitting "terminate" mid-step can't have a stale `setTimeout`
  silently re-highlight or re-click something afterward.
- **Every `setTimeout` handle is tracked** (the fix noted in `Automation.js`'s
  comments) so pause/rewind/forward/terminate reliably cancel whatever's
  in-flight.
- **`setValue` step type** (from `Computer-Automation.js`'s command set) is
  now actually handled by the engine — it fills an input via the native
  value setter and fires `input`/`change` events, matching how the
  `pay saved beneficiary` command in that file expected it to work.
- **Page navigation**: steps with `action: 'navigate'` still default to
  `window.location.href = url` and use `sessionStorage` to resume the
  in-progress command after the reload — that matches the original
  multi-page-site behavior. If your React app uses client-side routing
  instead, pass `onNavigate={navigate}` (e.g. from `react-router`'s
  `useNavigate()`) and the hook will call that instead of doing a hard
  navigation.
- **Settings persistence** still uses `localStorage`, same keys as before
  (`automation_stepDelay`, `automation_controlsPosition`, etc.), so existing
  users' saved settings carry over.

## Adding your own commands

`getDefaultCommands(context)` just returns a plain object — pass your own
instead if you want to add to it:

```jsx
import { appCommands } from './automation/automationCommands';

const myCommands = {
    ...appCommands,
    'do the thing': {
        steps: [{ action: 'click', selector: '#my-button' }],
        description: 'Does the thing',
        category: 'custom',
    },
};

<AutomationWidget commands={myCommands} />
```

You can also point `remoteCommandsUrl` at an endpoint returning
`{ tasks: [{ key, steps, description, category }] }` to load/override
commands at runtime, same as the original `loadAutomationCommands`.