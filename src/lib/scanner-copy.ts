export const L = {
  fr: {
    title: "Scanner d'Archétypes",
    subtitle: "Compagnon du livre — nommez votre archétype prédominant.",
    langBtn: "English",
    date: "Date de naissance",
    time: "Heure de naissance",
    place: "Lieu de naissance",
    reveal: "Révéler mon profil",
    errDate: "Entrez au moins votre date de naissance complète.",
    errTimePlace: "Heure et lieu elles aussi ? Elles affinent le profil, mais ne sont pas obligatoires.",
    note: "Lecture indicative calculée localement : positions solaire et lunaire approximatives. Un thème natal complet exige les coordonnées exactes du lieu.",
    sunCard: "Archétype solaire",
    moonCard: "Archétype lunaire",
    moonNote: "Le signe lunaire décrit votre monde intérieur, vos besoins émotionnels et vos réactions spontanées.",
    blendCard: "Décan",
    blendNote: "Le décan colore votre archétype solaire d'une seconde teinte.",
    dayCard: "Maître du jour",
    dayNote: "Le jour de la semaine où vous êtes né·e, selon la tradition planétaire.",
    numCard: "Sentier de vie",
    yearCard: "Année personnelle",
    keyword: "Mot-clé",
    shadow: "Ombre à surveiller",
    lifeNote: "Votre quête centrale, d'après la somme des chiffres de votre date de naissance.",
    yearNote: "D'après votre jour et mois de naissance en cours.",
    hisun: "Soleil en",
    himoon: "Lune en",
    gift: "Don",
    premium: "Pour aller plus loin : version approfondie avec heure et lieu exacts (thème complet, maisons, interprétations longues).",
    placeHeader: "Profil établi pour",
    unknownPlace: "lieu non précisé",
    blend: "blend de",
  },
  en: {
    title: "Archetype Scanner",
    subtitle: "Book companion — name your predominant archetype.",
    langBtn: "Français",
    date: "Date of birth",
    time: "Time of birth",
    place: "Place of birth",
    reveal: "Reveal my profile",
    errDate: "Enter at least your full date of birth.",
    errTimePlace: "Time and place too? They refine the profile but are optional.",
    note: "Indicative reading computed locally: approximate solar and lunar positions. A full natal chart requires exact place coordinates.",
    sunCard: "Solar archetype",
    moonCard: "Lunar archetype",
    moonNote: "The moon sign describes your inner world, emotional needs and spontaneous reactions.",
    blendCard: "Decan",
    blendNote: "The decan tints your solar archetype with a second hue.",
    dayCard: "Day ruler",
    dayNote: "The planetary tradition of your weekday of birth.",
    numCard: "Life path",
    yearCard: "Personal year",
    keyword: "Keyword",
    shadow: "Shadow to watch",
    lifeNote: "Your central quest, from the sum of your birth date digits.",
    yearNote: "From your day and month, for the current year.",
    hisun: "Sun in",
    himoon: "Moon in",
    gift: "Gift",
    premium: "To go deeper: the premium version with exact time and place (full natal chart, houses, long-form interpretations).",
    placeHeader: "Chart cast for",
    unknownPlace: "place not given",
    blend: "blend of",
  },
} as const;

export const SIGNNAME = {
  fr: { aries: "Bélier", taurus: "Taureau", gemini: "Gémeaux", cancer: "Cancer", leo: "Lion", virgo: "Vierge",
        libra: "Balance", scorpio: "Scorpion", sagittarius: "Sagittaire", capricorn: "Capricorne",
        aquarius: "Verseau", pisces: "Poissons" },
  en: { aries: "Aries", taurus: "Taurus", gemini: "Gemini", cancer: "Cancer", leo: "Leo", virgo: "Virgo",
        libra: "Libra", scorpio: "Scorpio", sagittarius: "Sagittarius", capricorn: "Capricorn",
        aquarius: "Aquarius", pisces: "Pisces" },
} as const;

export const ARCH = {
  hero: {
    fr: { name: "Le Héros", text: "Vous êtes ici pour vaincre : prouver votre valeur par l'action, l'audace et le dépassement. Votre arc de héros est l'apprentissage du courage vrai — qui n'est pas l'absence de peur, mais le choix d'avancer malgré elle." },
    en: { name: "The Hero", text: "You are here to overcome: to prove your worth through action, audacity and self-surpassing. Your hero's journey is learning true courage — not the absence of fear, but the choice to move through it." },
    keyword: { fr: "courage", en: "courage" }, shadow: { fr: "arrogance, besoin de gagner", en: "arrogance, need to win" },
    gift: { fr: "L’élan qui remet tout le monde en marche quand le groupe hésite.", en: "The spark that gets everyone moving when the group hesitates." },
  },
  caregiver: {
    fr: { name: "Le Soigneur", text: "Vous êtes ici pour prendre soin, protéger, faire grandir. Votre générosité crée des refuges ; votre travail intérieur est de vous inclure dans le cercle de ceux que vous sauvez." },
    en: { name: "The Caregiver", text: "You are here to care, protect and nurture. Your generosity creates refuges; your inner work is including yourself among those you save." },
    keyword: { fr: "bienveillance", en: "compassion" }, shadow: { fr: "dévouement excessif, martyr", en: "over-giving, martyrdom" },
    gift: { fr: "Créer autour de vous un sentiment de sécurité qui fait grandir les autres.", en: "Creating around you a sense of safety that lets others grow." },
  },
  explorer: {
    fr: { name: "L'Explorateur", text: "Vous êtes ici pour découvrir : l'horizon, le sens, la liberté. Vous grandissez par le mouvement et l'inconnu ; votre quête est de trouver en vous le foyer que vous cherchez au-dehors." },
    en: { name: "The Explorer", text: "You are here to discover: the horizon, the meaning, the freedom. You grow through movement and the unknown; your quest is finding the home you seek outside, within." },
    keyword: { fr: "liberté", en: "freedom" }, shadow: { fr: "errance, fuite", en: "wandering, escape" },
    gift: { fr: "Ouvrir des portes que les autres ne voyaient même pas.", en: "Opening doors others did not even see." },
  },
  rebel: {
    fr: { name: "Le Rebelle", text: "Vous êtes ici pour briser ce qui est mort : les règles, les dogmes, les plafonds. Votre radicalité est une force quand elle construit, un piège quand elle ne fait que détruire." },
    en: { name: "The Rebel", text: "You are here to break what is dead: rules, dogmas, ceilings. Your radicalism is a force when it builds, a trap when it only destroys." },
    keyword: { fr: "libération", en: "liberation" }, shadow: { fr: "destructivité, nihilisme", en: "destructiveness, nihilism" },
    gift: { fr: "Dire tout haut ce que tout le monde pense tout bas, et libérer la parole.", en: "Saying out loud what everyone whispers, and freeing the conversation." },
  },
  lover: {
    fr: { name: "L'Amant", text: "Vous êtes ici pour aimer et être aimé : la beauté, la passion, l'attirance. Votre sensibilité esthétique et relationnelle est un don ; votre ombre, la peur de perdre l'autre." },
    en: { name: "The Lover", text: "You are here to love and be loved: beauty, passion, attraction. Your aesthetic and relational sensibility is a gift; your shadow, the fear of losing the other." },
    keyword: { fr: "passion", en: "passion" }, shadow: { fr: "jalousie, dépendance", en: "jealousy, dependence" },
    gift: { fr: "Rendre les moments ordinaires intensément vivants pour ceux qui vous entourent.", en: "Making ordinary moments intensely alive for those around you." },
  },
  creator: {
    fr: { name: "Le Créateur", text: "Vous êtes ici pour donner forme : créer de la beauté, de l'ordre, de l'original. Vous vous réalisez par l'œuvre ; votre ombre est le perfectionnisme qui étouffe ce qu'il veut faire naître." },
    en: { name: "The Creator", text: "You are here to give form: to create beauty, order, the original. You fulfil yourself through the work; your shadow is the perfectionism that smothers what it wants to birth." },
    keyword: { fr: "création", en: "creation" }, shadow: { fr: "perfectionnisme, narcissisme", en: "perfectionism, narcissism" },
    gift: { fr: "Donner une forme visible à ce qui n’existait que dans l’imaginaire.", en: "Giving visible form to what only existed in imagination." },
  },
  jester: {
    fr: { name: "Le Bouffon", text: "Vous êtes ici pour alléger : rire, jouer, renverser les solennités. Votre légèreté est une sagesse ; elle devient fuite quand elle évite tout engagement sérieux." },
    en: { name: "The Jester", text: "You are here to lighten: to laugh, play and turn solemnity upside down. Your lightness is wisdom; it becomes escape when it avoids every serious commitment." },
    keyword: { fr: "insouciance", en: "spontaneity" }, shadow: { fr: "frivolité, irresponsabilité", en: "frivolity, irresponsibility" },
    gift: { fr: "Désamorcer les tensions d’un trait d’esprit au moment exact où il le faut.", en: "Defusing tension with a flash of wit at exactly the right moment." },
  },
  sage: {
    fr: { name: "Le Sage", text: "Vous êtes ici pour comprendre : analyser, chercher la vérité, dissiper l'illusion. Votre lucidité guide les autres ; son piège, l'intellectualisation qui remplace la vie." },
    en: { name: "The Sage", text: "You are here to understand: to analyse, seek truth and dispel illusion. Your clarity guides others; its trap, intellectualising instead of living." },
    keyword: { fr: "vérité", en: "truth" }, shadow: { fr: "détachement, cynisme", en: "detachment, cynicism" },
    gift: { fr: "Voir clair là où les autres s’embrouillent, et le partager simplement.", en: "Seeing clearly where others get tangled, and sharing it simply." },
  },
  magician: {
    fr: { name: "Le Magicien", text: "Vous êtes ici pour transformer : les situations, les êtres, vous-même. Vous savez voir les forces invisibles ; votre ombre est la manipulation, quand la volonté n'écoute plus l'éthique." },
    en: { name: "The Magician", text: "You are here to transform: situations, people, yourself. You perceive the invisible forces; your shadow is manipulation, when will no longer listens to ethics." },
    keyword: { fr: "transformation", en: "transformation" }, shadow: { fr: "manipulation", en: "manipulation" },
    gift: { fr: "Transformer les épreuves — les vôtres et celles des autres — en renaissance.", en: "Turning trials — yours and others’ — into rebirth." },
  },
  ruler: {
    fr: { name: "Le Souverain", text: "Vous êtes ici pour structurer et régner : bâtir l'ordre, assumer la responsabilité, créer la prospérité. Votre pouvoir est un service ; dégénéré, il devient contrôle." },
    en: { name: "The Ruler", text: "You are here to structure and reign: to build order, bear responsibility, create prosperity. Your power is a service; degenerated, it becomes control." },
    keyword: { fr: "maîtrise", en: "mastery" }, shadow: { fr: "contrôle, autoritarisme", en: "control, authoritarianism" },
    gift: { fr: "Bâtir des structures durables dans lesquelles chacun trouve sa place.", en: "Building lasting structures in which everyone finds their place." },
  },
  innocent: {
    fr: { name: "L'Innocent", text: "Vous êtes ici pour garder la foi : la simplicité, l'émerveillement, la confiance en la vie. Votre pureté est un refuge pour les autres ; sa part d'ombre, la naïveté qui refuse de voir." },
    en: { name: "The Innocent", text: "You are here to keep faith: simplicity, wonder, trust in life. Your purity is a refuge for others; its shadow, the naivety that refuses to see." },
    keyword: { fr: "confiance", en: "trust" }, shadow: { fr: "naïveté, déni", en: "naivety, denial" },
    gift: { fr: "Rappeler aux autres que la vie peut être simple, bonne et sûre.", en: "Reminding others that life can be simple, good and safe." },
  },
} as const;

export const MOON = {
  fr: { aries: "Vous ressenez vite, fort, et vous agissez avant d'avoir fini de ressentir. Vous avez besoin de mouvement pour digérer vos émotions.",
        taurus: "Votre équilibre passe par la stabilité, le confort et les rituels simples. La sécurité affective est votre oxygène.",
        gemini: "Vous avez besoin de parler de ce que vous ressentez pour savoir ce que vous ressentez. L'esprit est votre régulateur émotionnel.",
        cancer: "Hyper-réceptivité émotionnelle, mémoire du cœur, besoin d'un nid. Vous procurez le sentiment de maison aux autres.",
        leo: "Vous avez besoin d'être reconnu·e pour rayonner intérieurement. La fierté protège un cœur immense.",
        virgo: "Vous exprimez l'affection par l'utile : soigner, organiser, améliorer. Le désordre intérieur s'apaise par l'analyse.",
        libra: "L'harmonie autour de vous conditionne votre paix intérieure. La confrontation vous coûte plus qu'à d'autres.",
        scorpio: "Vous ressenez en profondeur et tout à fait, avec besoin d'intensité et de sincérité absolue.",
        sagittarius: "Votre émotionnel a besoin d'air, d'horizons, de sens. On vous guérit par l'optimisme et la distance bienveillante.",
        capricorn: "La maîtrise de soi ; vous contenez avant de céder. Vous vous sentez en sécurité quand vous êtes utile et solide.",
        aquarius: "Vous ressentez par le détachement, l'amitié, l'idéal. L'intensité fusionnelle vous déstabilise plus qu'elle n'attire.",
        pisces: "Empathie frontalière : vous absorbez les ambiances. Créativité et solitude régénératrice sont vos refuges." },
  en: { aries: "You feel fast and strong, and act before you finish feeling. Movement is how you digest emotion.",
        taurus: "Your balance runs on stability, comfort and simple rituals. Emotional security is your oxygen.",
        gemini: "You need to talk about what you feel to know what you feel. The mind is your emotional regulator.",
        cancer: "Deep emotional receptivity, a memory of the heart, a need for a nest. You give others the feeling of home.",
        leo: "You need recognition to shine inside. Pride protects a vast heart.",
        virgo: "You express affection through the useful: caring, organising, improving. Inner disorder is soothed by analysis.",
        libra: "Harmony around you conditions your inner peace. Confrontation costs you more than most.",
        scorpio: "You feel deeply and completely, with a need for intensity and absolute sincerity.",
        sagittarius: "Your emotional life needs air, horizons, meaning. Optimism and benevolent distance heal you.",
        capricorn: "Self-command: you contain before you yield. You feel safe when useful and solid.",
        aquarius: "You feel through detachment, friendship and ideals. Fusion destabilises you more than it attracts.",
        pisces: "Borderless empathy: you absorb atmospheres. Creativity and regenerative solitude are your shelters." },
} as const;

export const DAYS = [
  { fr: "dimanche", en: "Sunday", ruler: { fr: "Soleil", en: "Sun" }, note: { fr: "Identité, rayonnement, générosité.", en: "Identity, radiance, generosity." } },
  { fr: "lundi", en: "Monday", ruler: { fr: "Lune", en: "Moon" }, note: { fr: "Intuition, sensibilité, imagination.", en: "Intuition, sensitivity, imagination." } },
  { fr: "mardi", en: "Tuesday", ruler: { fr: "Mars", en: "Mars" }, note: { fr: "Énergie, audace, combat.", en: "Energy, boldness, fight." } },
  { fr: "mercredi", en: "Wednesday", ruler: { fr: "Mercure", en: "Mercury" }, note: { fr: "Intellect, échange, agitation féconde.", en: "Intellect, exchange, fruitful restlessness." } },
  { fr: "jeudi", en: "Thursday", ruler: { fr: "Jupiter", en: "Jupiter" }, note: { fr: "Expansion, chance, idéal.", en: "Expansion, luck, ideal." } },
  { fr: "vendredi", en: "Friday", ruler: { fr: "Vénus", en: "Venus" }, note: { fr: "Amour, beauté, harmonie.", en: "Love, beauty, harmony." } },
  { fr: "samedi", en: "Saturday", ruler: { fr: "Saturne", en: "Saturn" }, note: { fr: "Discipline, endurance, sagesse du temps.", en: "Discipline, endurance, the wisdom of time." } },
] as const;

export const LIFE = {
  fr: { 1: "Le chemin du pionnier : oser, initier, être le premier. Votre quête est l'autonomie.", 2: "Le chemin du médiateur : unir, écouter, tempons entre les mondes. Votre quête est la paix juste.", 3: "Le chemin du conteur : exprimer, joindre, réjouir. Votre quête est la voix vraie.", 4: "Le chemin du bâtisseur : structurer, durer, fiabiliser. Votre quête est l'œuvre solide.", 5: "Le chemin du nomade : explorer, changer, goûter la vie. Votre quête est la liberté lucide.", 6: "Le chemin du protecteur : aimer, soigner, harmoniser. Votre quête est le don équilibré.", 7: "Le chemin du mystique : chercher, approfondir, se retirer. Votre quête est la vérité intérieure.", 8: "Le chemin du souverain : réaliser, commander, prospérer. Votre quête est le pouvoir juste.", 9: "Le chemin de l'universel : donner, rassembler, transcender. Votre quête est le lâcher-prise." },
  en: { 1: "The pioneer's path: dare, initiate, go first. Your quest is autonomy.", 2: "The mediator's path: unite, listen, be the hinge between worlds. Your quest is just peace.", 3: "The storyteller's path: express, connect, delight. Your quest is the true voice.", 4: "The builder's path: structure, endure, make solid. Your quest is the lasting work.", 5: "The nomad's path: explore, change, taste life. Your quest is lucid freedom.", 6: "The protector's path: love, heal, harmonise. Your quest is balanced giving.", 7: "The mystic's path: seek, deepen, withdraw. Your quest is inner truth.", 8: "The sovereign's path: achieve, command, prosper. Your quest is just power.", 9: "The universal path: give, gather, transcend. Your quest is letting go." },
} as const;

export const ELEMENTS = {
  fr: { fire: "Feu", earth: "Terre", air: "Air", water: "Eau" },
  en: { fire: "Fire", earth: "Earth", air: "Air", water: "Water" },
} as const;

export const ELEMENTNOTE = {
  fire: { fr: "Votre élément est le Feu : l’enthousiasme, l’initiative et l’instinct vous portent. Vous avancez par élans.", en: "Your element is Fire: enthusiasm, initiative and instinct carry you. You move in bursts of energy." },
  earth: { fr: "Votre élément est la Terre : le concret, la patience et les sens vous ancrent. Vous avancez pas à pas, solidement.", en: "Your element is Earth: the concrete, patience and the senses ground you. You advance step by step, solidly." },
  air: { fr: "Votre élément est l’Air : les idées, les échanges et la curiosité vous portent. Vous avancez par la pensée et le lien.", en: "Your element is Air: ideas, exchange and curiosity carry you. You advance through thought and connection." },
  water: { fr: "Votre élément est l’Eau : l’émotion, l’intuition et l’imaginaire vous guident. Vous avancez par le ressenti.", en: "Your element is Water: emotion, intuition and imagination guide you. You advance by feeling." },
} as const;

export const MODES = {
  fr: { cardinal: "Cardinal", fixed: "Fixe", mutable: "Mutable" },
  en: { cardinal: "Cardinal", fixed: "Fixed", mutable: "Mutable" },
} as const;

export const MODENOTE = {
  cardinal: { fr: "Signe cardinal : vous initiez. Votre force est de commencer, de lancer, d’ouvrir la voie.", en: "Cardinal sign: you initiate. Your strength is starting, launching, opening the way." },
  fixed: { fr: "Signe fixe : vous consolidez. Votre force est la persévérance, la fidélité, la profondeur.", en: "Fixed sign: you consolidate. Your strength is perseverance, loyalty, depth." },
  mutable: { fr: "Signe mutable : vous adaptez. Votre force est la souplesse, la transition, le renouvellement.", en: "Mutable sign: you adapt. Your strength is flexibility, transition, renewal." },
} as const;

export const SUNMOON = {
  same: { fr: "Votre Soleil et votre Lune partagent le même signe : votre vie intérieure et votre vie extérieure parlent d’une seule voix. Cohérence rare — mais attention aux angles morts.", en: "Your Sun and Moon share the same sign: your inner and outer life speak with one voice. A rare coherence — but watch the blind spots." },
  sameElement: { fr: "Votre Soleil et votre Lune partagent le même élément : vos besoins émotionnels et votre direction de vie se soutiennent naturellement.", en: "Your Sun and Moon share the same element: your emotional needs and your life direction naturally support each other." },
  different: { fr: "Votre Soleil et votre Lune appartiennent à des éléments différents : une part de vous tire dans une direction, une autre dans une autre. Cette tension est aussi votre richesse.", en: "Your Sun and Moon belong to different elements: one part of you pulls one way, another pulls elsewhere. That tension is also your richness." },
} as const;

export type Language = "en" | "fr";
