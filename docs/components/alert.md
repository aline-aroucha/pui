# Alert

Mensagem persistente dentro da página. É o `Alert` do shadcn/ui (`AlertTitle`, `AlertDescription`).

## O que você fornece
- `variant`: `default` | `destructive`.
- Ícone `lucide-react` 16px como primeiro filho (o shadcn posiciona automaticamente).
- `AlertTitle`: o que aconteceu. `AlertDescription`: o que fazer agora.

## Uso
- Para avisos temporários após uma ação, use `toast` (Sonner), não Alert.
- Erros: diga o problema e a correção, sem pedir desculpas ("O cartão expirou. Atualize a forma de pagamento.").
