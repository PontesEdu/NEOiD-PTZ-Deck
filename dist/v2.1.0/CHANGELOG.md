# NEOiD PTZ Deck — v2.1.0

## Novidades

- **Indicador de tally no botão Select Camera** — ao selecionar uma câmera NEOiD, o botão pisca em vermelho se a câmera estiver ao vivo (PGM) ou em verde se estiver em preview (PVW).
- **Modo Camera IP fixo no botão Preset** — cada botão Preset pode agora ser configurado com um IP de câmera fixo, funcionando de forma independente da câmera selecionada globalmente.
- **Suporte a NEOiD By Telycam no modo Camera IP fixo** — os botões Controls e Preset no modo Camera IP fixo agora funcionam também com câmeras NEOiD By Telycam.
- **Dials de Zoom e Foco (Stream Deck+)** — novas actions exclusivas para o Stream Deck+: gire o dial para controlar o zoom (aproximar/afastar) ou o foco (Near/Far), e pressione o dial de foco para ativar o autofoco.
- **Textos de ajuda em todas as configurações** — cada action agora exibe descrições e avisos diretamente no painel de configuração do Stream Deck, explicando como funciona e destacando limitações. Todo o conteúdo está disponível em inglês e português (Brasil).

## Melhorias

- **Botão Tracking mais intuitivo** — quando o tracking já está ativo, um toque curto apenas desativa, sem avançar para o próximo modo. O modo só muda quando o tracking está desligado.
- **Botões Tracking sincronizados** — vários botões Tracking na mesma página agora se atualizam juntos. O estado também é restaurado automaticamente após o computador sair do modo de espera ou ao reconectar o Stream Deck.
- **Rótulos dos dials mais claros** — o dial de foco exibe "Near / Far" e "Auto focus"; o dial de zoom exibe "Zoom in / Zoom out".

## Correções

- **Botão "Back OSD" com nome errado** — o botão aparecia como "Back OSB". Corrigido.
- **Botão Tracking exibindo estado desatualizado** — ao trocar de câmera, o botão de tracking podia manter o ícone e modo da câmera anterior. Corrigido.
- **Comandos disparando ao trocar de página** — em algumas situações, ao navegar entre páginas do perfil, comandos de movimento podiam ser enviados involuntariamente. Corrigido.

## Interface

- **Nomes das actions simplificados** — "Select Camera PTZ" virou Select Camera e "Controls PTZ" virou Controls.
- **Tipo de câmera renomeado** — "Telycam" agora aparece como NEOiD By Telycam nas configurações.
- **Mensagem de "No camera" unificada** — todos os botões agora exibem "No camera" de forma consistente quando nenhuma câmera está selecionada ou quando a câmera está inacessível.
