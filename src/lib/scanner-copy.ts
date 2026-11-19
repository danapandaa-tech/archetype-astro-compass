import { ARCHETYPES } from "@/lib/archetypes";
const CAST_FR = [["Initiative et courage de commencer.", "Impulsivité et précipitation sans écoute.", "Commencer avec courage en respectant le rythme des autres."], ["Stabilité, patience et présence ancrée.", "Inertie, possessivité et résistance au changement.", "Rester ancré tout en accueillant le changement."], ["Curiosité et lien entre les perspectives par le langage.", "Attention dispersée et paroles déconnectées du vécu.", "Écouter profondément et communiquer avec clarté."], ["Sensibilité émotionnelle et protection attentive.", "Surprotection et attachement excessif.", "Prendre soin avec des limites qui permettent de grandir."], ["Expression créative et confiance généreuse.", "Dépendance aux applaudissements et personnalisation excessive.", "S’exprimer sincèrement sans dépendre de l’approbation."], ["Discernement et amélioration concrète.", "Perfectionnisme et critique incessante.", "Améliorer l’essentiel en acceptant l’imperfection."], ["Équilibre, équité et sensibilité relationnelle.", "Complaisance et évitement du conflit nécessaire.", "Créer l’harmonie sans taire sa vérité."], ["Profondeur et capacité de renouvellement sincère.", "Contrôle, fixation et méfiance.", "Accueillir le changement sans contrôler les autres."], ["Exploration et recherche de sens.", "Agitation et certitudes qui négligent les nuances.", "Explorer largement et vivre les leçons de l’expérience."], ["Responsabilité et construction durable.", "Rigidité et valeur personnelle réduite aux résultats.", "Construire avec sens en permettant repos et souplesse."], ["Perspective originale et possibilités collectives.", "Détachement et idéaux éloignés des besoins vécus.", "Relier sa vision aux autres et à des actions concrètes."], ["Intuition, compassion et sensibilité au lien.", "Fuite et perte des limites personnelles.", "Ancrer l’intuition dans le quotidien avec des limites claires."]];

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

export const ARCH: Record<string, { name: string; gift: { en: string; fr: string }; shadow: { en: string; fr: string }; developmentalTask: { en: string; fr: string } }> = Object.fromEntries(ARCHETYPES.map((a, i) => [a.id, { name: a.name, gift: { en: a.gift, fr: CAST_FR[i]?.[0] ?? a.gift }, shadow: { en: a.shadow, fr: CAST_FR[i]?.[1] ?? a.shadow }, developmentalTask: { en: a.developmentalTask, fr: CAST_FR[i]?.[2] ?? a.developmentalTask } }]));

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
