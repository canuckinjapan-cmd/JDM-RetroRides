# JDM Business Logic Skill

**Description:** Applies core business rules for JDM Retro Rides (car export from Japan to UK/Australia) to design and code tasks. Use this for audits, frontend work, and listing logic.

**Core Context (Global Constraints):**

- **Brand:** JDM Retro Rides.
- **Identity:** British reliability meets Japanese technical precision.
- **Audience:** Western (UK, Australia). Minimalist, high-end aesthetic.
- **Pricing:** Internal data is JPY (¥). Public display must offer JPY with optional conversion estimates.
- **Tone:** Technical, professional, and transparent (no sales fluff).

**Instructions:**

1. **Validation:** Whenever creating or editing a UI component, ensure it adheres to "Trust-Based" design (clear specs, high-quality imagery, visible auction grades).
2. **Technical Specs:** Always verify that car details include: Make, Model, Year, Mileage (km), and Auction Grade.
3. **Frontend:** Prefer CSS Grid/Flexbox for a clean, premium layout. Minimize heavy libraries.
4. **Geography:** Use UK/Australian English (e.g., "Colour," "Tyres") unless referring to a Japanese-specific part name.

**Examples:**

- *Input:* "Analyze this card." -> *Output:* "Refactored listing card for JDM Retro Rides. Adjusted hierarchy to highlight ¥ Price and Auction Grade first for Western trust."
- *Input:* "Code the header." -> *Output:* "Created minimalist sticky header with high-contrast typography and clear international contact links."
