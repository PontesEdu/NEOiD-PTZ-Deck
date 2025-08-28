import streamDeck, { action, DidReceiveSettingsEvent, KeyDownEvent, SingletonAction, WillAppearEvent } from "@elgato/streamdeck";

interface WbModeProps {
  value: number;
  name: string;
}

const wbModes: WbModeProps[] = [
  { value: 0, name: "Auto" },
  { value: 4, name: "Indoor" },
  { value: 5, name: "Outdoor" },
  { value: 1, name: "Manual" },
  { value: 3, name: "VAR" },
  { value: 2, name: "OnePush" },
];

let currentWbIndex = 0; // valor temporário em runtime

const getNextWbIndex = () => (currentWbIndex + 1) % wbModes.length;

@action({ UUID: "com.neoid.ptzneoid.wbmode" })
export class WbMode extends SingletonAction {

  // Carrega valor salvo ao aparecer na tela
  override async onWillAppear(ev: WillAppearEvent) {
    const globals = await streamDeck.settings.getGlobalSettings();
    const cameraIP = globals.cameraIP
    
    if(!cameraIP){
      ev.action.setTitle(`Sem Camera`)
      return;
    }

    const savedIndex = globals?.wbModeIndex;

    if (typeof savedIndex === "number" && savedIndex >= 0 && savedIndex < wbModes.length) {
      currentWbIndex = savedIndex;
    } else {
      currentWbIndex = 0; // fallback para "Auto"
    }

    // Atualiza o título no botão
    ev.action.setTitle(wbModes[currentWbIndex].name);
  }

  // Quando usuário pressiona a tecla
  override async onKeyDown(ev: KeyDownEvent) {
    currentWbIndex = getNextWbIndex();
    const mode = wbModes[currentWbIndex];

    const globals = await streamDeck.settings.getGlobalSettings();
    
    const cameraIP = globals.cameraIP
    
    if(!cameraIP){
      ev.action.setTitle(`Sem Camera`)
      return;
    }

    // Envia comando para a câmera
    const url = `http://${cameraIP}/cgi-bin/ptzctrl.cgi?post_image_value&wbmode&${mode.value}`;
    const res = await fetch(url);

    // Atualiza título
    if(res.ok){
      ev.action.setTitle(mode.name);
      await streamDeck.settings.setGlobalSettings({
        ...globals,
        wbModeIndex: currentWbIndex,
      });
    }
  }

  // Caso configuração global mude em outro lugar
  override async onDidReceiveSettings(ev: DidReceiveSettingsEvent) {
    const globals = await streamDeck.settings.getGlobalSettings();
    const cameraIP = globals.cameraIP
    
    if(!cameraIP){
      ev.action.setTitle(`Sem Camera`)
      return;
    }

    const savedIndex = globals.wbModeIndex;

    if (typeof savedIndex === "number" && savedIndex >= 0 && savedIndex < wbModes.length) {
      currentWbIndex = savedIndex;
      ev.action.setTitle(wbModes[currentWbIndex].name);
    }
  }
}
