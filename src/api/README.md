# Camera API layer (private)

The source of this folder is not published. It holds the protocol-level
implementation for each camera vendor — endpoint addresses, command
payloads and the byte sequences sent over the wire.

The compiled layer ships inside the plugin builds under [`dist/`](../../dist),
so the plugin is fully functional when installed. Only the source is kept
private.

## What lives here

| File | Responsibility |
|---|---|
| `api-neoid.ts` | NEOiD cameras: CGI/HTTP endpoints, with VISCA as a fallback |
| `api-telycam.ts` | Telycam cameras: JSON API, with VISCA for what the API does not cover (diagonal movements, backlight, presets without a session key) |

## How the rest of the codebase sees it

Actions never talk to these classes directly. They depend on the
`CameraAPI` interface declared in
[`src/utils/camera-api.ts`](../utils/camera-api.ts), which is public and
shows the full contract:

```ts
export interface CameraAPI {
  move(direction: PTZDirection, speed: SpeedType): Promise<void>;
  stopMove(): Promise<void>;
  moveZoom(direction: "zoomin" | "zoomout", speed: SpeedType): Promise<void>;
  stopZoom(): Promise<void>;
  moveFocus(direction: "focusin" | "focusout" | "afocus", speed: SpeedType): Promise<void>;
  stopFocus(): Promise<void>;
  callPreset(n: number): Promise<void>;
  addSetPreset(n: number): Promise<void>;
  toggleBacklight(enable: boolean): Promise<void>;
}
```

`resolveCamera(globals)` reads the active camera from the global settings
and returns the matching adapter, so no action ever branches on the camera
model. The two adapters in that file, `NeoidAdapter` and `TelycamAdapter`,
map this interface onto the vendor classes:

| `CameraAPI` | `APINeoid` | `APITelycam` |
|---|---|---|
| `move` / `stopMove` | `Move` / `StopMove` | `MoveTelycam` / `StopTelycamControls` |
| `moveZoom` / `stopZoom` | `MoveZoomAndFocus` / `StopZoomAndFocus("zoom")` | `MoveZoomTelycam` / `StopZoomTelycam` |
| `moveFocus` / `stopFocus` | `MoveZoomAndFocus` / `StopZoomAndFocus("focus")` | `MoveFocusTelycam` / `StopFocusTelycam` |
| `callPreset` / `addSetPreset` | `CallPreset` / `AddSetPreset` | `CallPreset` / `AddSetPreset` |
| `toggleBacklight` | `toggleBacklight` | `toggleBacklight` |

Tracking sits outside the interface, because the modes are not equivalent
between vendors: NEOiD exposes `SendTrackingMode` and `SendTrackingActive`,
Telycam exposes `TrackingMode` and `SetTrackingActive`, and the two sets of
modes are stored under separate keys in the global settings.

## Building from source

Without this folder the project does not compile. To try the plugin,
install a packaged build from [`dist/`](../../dist) or from the
[Releases](../../../releases) page.
