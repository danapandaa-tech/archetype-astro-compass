<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Keep scanner calculations in a pure browser-safe module using astronomy-engine, with explicit UTC offsets; birth details stay in memory because this free scanner does not require stored profiles.
- Derive scanner, wheel, assessment and reflection cast references from one canonical browser-safe archetype module to prevent duplicate or conflicting sign mappings; use fixed civil-date Sun ranges and astronomy-engine for Moon and decan calculations.
- Keep the extended-reading offer non-purchasable until a payment link and verified access flow are supplied; never unlock paid content from a return URL alone.
- Keep oracle and polarity rules in a pure browser-safe reflection module, separate from scanner mappings; use explicit local UTC offsets for the daily ruler and keep journal entries and birth inputs in React memory only to avoid storing private reflections.
- Keep guided calling questions and equal-weight scoring in a pure browser-safe assessment module; break ties by latest selected answer, use the runner-up or an explicit balancing map for shadow invitations, and pass results in React memory to Mirror and Share Card so reflective answers are not persisted.
