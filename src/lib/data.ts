export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  author: Author;
  date: string;
  image: string;
  readTime: number;
  isFeatured: boolean;
  isTrending: boolean;
}

export interface Author {
  name: string;
  role: string;
}

export type Category =
  | "Politique"
  | "Économie"
  | "Sport"
  | "Culture"
  | "Société"
  | "International"
  | "Environnement";

export const categories: Category[] = [
  "Politique",
  "Économie",
  "Sport",
  "Culture",
  "Société",
  "International",
  "Environnement",
];

export const categoryColors: Record<Category, string> = {
  Politique: "bg-red-600 text-white",
  Économie: "bg-amber-600 text-white",
  Sport: "bg-green-600 text-white",
  Culture: "bg-purple-600 text-white",
  Société: "bg-teal-600 text-white",
  International: "bg-orange-600 text-white",
  Environnement: "bg-emerald-600 text-white",
};

export const categoryImageMap: Record<Category, string> = {
  Politique: "/img/politique.jpg",
  Économie: "/img/economie.jpg",
  Sport: "/img/sport.jpg",
  Culture: "/img/culture.jpg",
  Société: "/img/societe.jpg",
  International: "/img/goree.jpg",
  Environnement: "/img/goree.jpg",
};

const authors: Author[] = [
  { name: "Aminata Diallo", role: "Rédactrice en chef" },
  { name: "Moussa Ndiaye", role: "Journaliste politique" },
  { name: "Fatou Sow", role: "Correspondante économique" },
  { name: "Ibrahima Fall", role: "Rédacteur sportif" },
  { name: "Mariama Ba", role: "Journaliste culture" },
  { name: "Ousmane Diop", role: "Rédacteur société" },
  { name: "Aïssatou Seck", role: "Correspondante tech" },
  { name: "Cheikh Sy", role: "Rédacteur international" },
  { name: "Coumba Thioune", role: "Journaliste environnement" },
  { name: "Babacar Kane", role: "Éditorialiste" },
];

export const articles: Article[] = [
  {
    id: "1",
    title: "Le Sénégal lance un vaste programme de réforme agricole pour nourrir 18 millions de Sénégalais",
    excerpt:
      "Le gouvernement sénégalais a dévoilé ce mardi un plan ambitieux de modernisation de l'agriculture, avec un investissement de 800 milliards de FCFA sur cinq ans pour assurer la souveraineté alimentaire du pays.",
    content: `Le Sénégal a franchi un pas déterminant dans sa quête d'autosuffisance alimentaire. Lors d'une cérémonie officielle au Palais de la République à Dakar, le Président a présenté le Programme National de Souveraineté Alimentaire (PNSA), un plan quinquennal doté de 800 milliards de FCFA.

Le programme vise à transformer radicalement le secteur agricole à travers plusieurs axes stratégiques : la modernisation des infrastructures d'irrigation, l'accès facilité aux crédits agricoles pour les petits exploitants, et la formation de 50 000 jeunes agriculteurs aux techniques modernes.

« Notre ambition est claire : d'ici 2031, le Sénégal devra produire au moins 80% de sa consommation en riz, blé et autres céréales de base », a déclaré le Ministre de l'Agriculture lors de la conférence de presse qui a suivi l'annonce.

Les premières régions bénéficiaires seront la Vallée du Fleuve Sénégal, le bassin arachidier et la Casamance, où les conditions pédoclimatiques sont les plus favorables. Des centres de formation agricole seront également construits dans les 14 régions du pays.`,
    category: "Économie",
    author: authors[2],
    date: "2026-04-22T08:30:00",
    image: "/img/economie.jpg",
    readTime: 5,
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "2",
    title: "Réforme constitutionnelle : l'Assemblée nationale adopte le texte en première lecture",
    excerpt:
      "Après trois jours de débats intenses, les députés sénégalais ont voté en faveur de la réforme constitutionnelle qui vise à renforcer les pouvoirs du Parlement et instaurer un nouveau mode de scrutin.",
    content: `L'Assemblée nationale a adopté en première lecture, par 105 voix pour et 42 contre, le projet de loi constitutionnelle portant révision de plusieurs articles fondamentaux de la Constitution du Sénégal.

Le texte, qui doit désormais être soumis au référendum, prévoit notamment l'instauration d'un scrutin proportionnel intégral pour les élections législatives, la création d'une Cour des comptes indépendante, et le renforcement du rôle de l'opposition parlementaire.

L'adoption de ce texte marque un tournant dans la vie politique sénégalaise. Les partis de la majorité ont salué un « pas historique vers plus de démocratie », tandis que l'opposition dénonce un texte « insuffisant » qui ne va pas assez loin dans la décentralisation.

Le référendum est attendu pour le mois de juin prochain, et le gouvernement a déjà lancé une vaste campagne d'information citoyenne à travers le pays.`,
    category: "Politique",
    author: authors[1],
    date: "2026-04-22T10:15:00",
    image: "/img/politique.jpg",
    readTime: 4,
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "3",
    title: "Lions du Sénégal : qualification historique pour les demi-finales de la CAN 2026",
    excerpt:
      "L'équipe nationale de football sénégalaise s'est qualifiée pour les demi-finales de la Coupe d'Afrique des Nations après une victoire éclatante 3-0 contre le Nigeria en quart de finale.",
    content: `Les Lions de la Teranga ont fait trembler le continent ! Face au Nigeria, redoutable favori de la compétition, les hommes d'Aliou Cissé ont livré une prestation magistrale au Stade Léopold Sédar Senghor de Dakar, devant plus de 60 000 spectateurs en liesse.

Le premier but est arrivé dès la 12e minute sur une frappe surpuissante de Sadio Mané, qui a trompé le gardien nigérian d'une volée acrobatique. Le deuxième but, œuvre de Nicolas Jackson à la 45e minute, a été salué comme l'un des plus beaux de la compétition.

En deuxième mi-temps, le Nigeria a tenté de revenir mais la défense sénégalaise, emmenée par un Édouard Mendy impérial, a tenu bon. Le but du scellage est arrivé à la 78e minute par un jeune talent de 19 ans, Pape Amadou Diallo, qui marque son premier but en sélection.

Dakar est en fête depuis l'annonce du résultat. Des milliers de supporters ont envahi les rues de la capitale, klaxons et chants à l'appui. Le Président de la République a d'ores et déjà félicité les joueurs et convoqué l'équipe au Palais.`,
    category: "Sport",
    author: authors[3],
    date: "2026-04-21T20:45:00",
    image: "/img/sport.jpg",
    readTime: 4,
    isFeatured: true,
    isTrending: true,
  },
  {
    id: "4",
    title: "Festival au désert de Dakar 2026 : une édition record avec plus de 200 000 visiteurs",
    excerpt:
      "La 15e édition du Festival au désert, organisée à Dakar, a battu tous les records de fréquentation avec des artistes venus de 40 pays différents, célébrant la diversité culturelle africaine.",
    content: `Le Festival au désert de Dakar a clos sa 15e édition dans une ambiance de fête et de partage, enregistrant une fréquentation record de plus de 200 000 visiteurs sur quatre jours. L'événement, qui s'est tenu sur la Corniche Ouest, a transformé Dakar en une véritable vitrine de la culture africaine et mondiale.

Cette édition a été marquée par des performances mémorables d'artistes de renommée internationale tels que Youssou N'Dour, Burna Boy, Angélique Kidjo et le groupe malien Amadou & Mariam. Les scènes ont également accueilli de nombreux talents émergents, offrant une plateforme inédite à la nouvelle génération d'artistes africains.

Le ministre de la Culture a qualifié cette édition de « triomphe de la diversité culturelle sénégalaise » et a annoncé un budget en augmentation de 30% pour l'édition 2027, avec l'ambition de faire du festival un événement de classe mondiale.`,
    category: "Culture",
    author: authors[4],
    date: "2026-04-21T18:00:00",
    image: "/img/culture.jpg",
    readTime: 3,
    isFeatured: false,
    isTrending: true,
  },
  {
    id: "5",
    title: "Dakar Smart City : le plan de transformation numérique de la capitale dévoilé",
    excerpt:
      "Le projet Dakar Smart City prévoit la digitalisation complète des services publics, un réseau de transport intelligent et la couverture en fibre optique de l'ensemble de la métropole d'ici 2028.",
    content: `La ville de Dakar entame sa transformation radicale en ville intelligente. Le maire de Dakar a présenté ce matin le plan détaillé du projet « Dakar Smart City », un programme de 500 milliards de FCFA financé en partenariat avec la Banque Mondiale et plusieurs investisseurs privés internationaux.

Le plan s'articule autour de trois piliers fondamentaux. Le premier concerne la mobilité intelligente : un système de transport interconnecté reliant le BRT, le TER et les bus municipaux grâce à une application unique de paiement et de planification d'itinéraires.

Le deuxième pilier est la digitalisation des services administratifs. D'ici fin 2027, tous les documents administratifs pourront être demandés en ligne, réduisant considérablement les files d'attente dans les administrations.

Enfin, le troisième pilier porte sur la couverture numérique : 100% de la métropole dakaroise sera couverte en fibre optique d'ici 2028, avec des points WiFi publics gratuits dans tous les espaces verts et les transports en commun.`,
    category: "Société",
    author: authors[6],
    date: "2026-04-21T14:30:00",
    image: "/img/societe.jpg",
    readTime: 5,
    isFeatured: false,
    isTrending: false,
  },
  {
    id: "6",
    title: "Lutte contre le paludisme : le Sénégal enregistre une baisse de 60% des cas en trois ans",
    excerpt:
      "Grâce à une campagne massive de distribution de moustiquaires et un programme de traitement préventif, le Sénégal est cité en exemple par l'OMS dans la lutte contre le paludisme en Afrique de l'Ouest.",
    content: `Le Sénégal est en passe de devenir un modèle de réussite dans la lutte contre le paludisme en Afrique subsaharienne. Selon les derniers chiffres publiés par le Ministère de la Santé, le nombre de cas de paludisme a chuté de 60% entre 2023 et 2026, une baisse jamais observée dans la région.

Cette avancée spectaculaire est le fruit d'une stratégie multisectorielle impliquant la distribution gratuite de plus de 3 millions de moustiquaires imprégnées d'insecticide, la pulvérisation intra-domiciliaire dans les zones à risque, et le déploiement de 500 nouveaux centres de diagnostic rapide à travers le pays.

L'Organisation Mondiale de la Santé (OMS) a salué les efforts du Sénégal et a invité d'autres pays africains à s'inspirer de ce modèle. Le directeur régional de l'OMS pour l'Afrique a qualifié ces résultats de « preuve que la fin du paludisme est possible avec une volonté politique forte ».

Le gouvernement prévoit d'intensifier les efforts avec l'introduction prochaine du vaccin RTS,S/AS01 pour les enfants de moins de 5 ans dans les régions les plus touchées.`,
    category: "Société",
    author: authors[5],
    date: "2026-04-21T09:00:00",
    image: "/img/societe.jpg",
    readTime: 4,
    isFeatured: false,
    isTrending: false,
  },
  {
    id: "7",
    title: "Île de Gorée : inauguration du nouveau musée de la Mémoire et de l'Histoire",
    excerpt:
      "L'ancienne Maison des Esclaves de Gorée a été entièrement rénovée et un nouveau musée interactif a été inauguré, retraçant l'histoire de la traite négrière avec des technologies immersives de pointe.",
    content: `L'île de Gorée, classée au patrimoine mondial de l'UNESCO, a inauguré ce week-end son nouveau musée de la Mémoire et de l'Histoire, un espace muséal de 2 000 m² dédié à la préservation et à la transmission de la mémoire de la traite transatlantique.

Le musée, qui a nécessité trois ans de travaux et un investissement de 15 milliards de FCFA, utilise des technologies de pointe pour offrir une expérience immersive unique. Les visiteurs peuvent notamment parcourir des reconstitutions virtuelles en réalité augmentée des conditions de vie des esclaves, écouter des témoignages d'historiens et de descendants, et consulter une base de données numérique de plus de 100 000 noms d'individus déportés.

Le Président de la République, présent à la cérémonie d'inauguration, a qualifié le musée de « lieu de mémoire indispensable pour l'humanité tout entière ». Plusieurs chefs d'État africains et de la diaspora étaient également présents pour l'occasion.

Le musée devrait attirer plus de 500 000 visiteurs par an, ce qui ferait de Gorée l'un des sites culturels les plus visités d'Afrique de l'Ouest.`,
    category: "Culture",
    author: authors[4],
    date: "2026-04-20T16:00:00",
    image: "/img/goree.jpg",
    readTime: 4,
    isFeatured: false,
    isTrending: false,
  },
  {
    id: "8",
    title: "Sommet de l'Union Africaine à Dakar : 54 chefs d'État adoptent la Charte du Numérique Africain",
    excerpt:
      "Le sommet extraordinaire de l'Union Africaine, réuni à Dakar, a abouti à l'adoption historique d'une charte commune pour la régulation du numérique sur le continent.",
    content: `Dakar a été le théâtre d'un événement historique ce week-end avec la tenue du sommet extraordinaire de l'Union Africaine, qui a réuni 54 chefs d'État et de gouvernement. À l'issue de deux jours de négociations intenses, les dirigeants africains ont adopté la Charte du Numérique Africain, un cadre juridique commun pour la régulation d'Internet et des technologies numériques sur le continent.

La charte prévoit la création d'un marché unique numérique africain, la libre circulation des données entre pays membres, et la mise en place d'une autorité de régulation continentale basée à Nairobi. Elle aborde également des questions cruciales comme la protection de la vie privée, la cybercriminalité et l'intelligence artificielle.

Le Président sénégalais, hôte du sommet, a salué « un moment fondateur pour l'Afrique du 21e siècle ». L'Union Européenne et les États-Unis ont déjà exprimé leur soutien à cette initiative et annoncé des partenariats pour son financement.`,
    category: "International",
    author: authors[7],
    date: "2026-04-20T12:00:00",
    image: "/img/hero-dakar.jpg",
    readTime: 6,
    isFeatured: false,
    isTrending: true,
  },
  {
    id: "9",
    title: "Startup sénégalaise WaveGen valorisée à 2 milliards de dollars après une levée de fonds record",
    excerpt:
      "La fintech sénégalaise WaveGen, spécialisée dans les paiements mobiles, a levé 400 millions de dollars lors d'une série D, devenant la startup la plus valorisée d'Afrique de l'Ouest.",
    content: `L'écosystème tech sénégalais célèbre une nouvelle réussite majeure. WaveGen, la startup de fintech fondée en 2020 à Dakar, vient d'annoncer une levée de fonds de 400 millions de dollars en série D, portant sa valorisation à 2 milliards de dollars. Un record absolu pour une startup d'Afrique de l'Ouest.

Cette levée de fonds, dirigée par des fonds d'investissement américains et européens, permettra à WaveGen d'accélérer son expansion sur le continent africain. La startup prévoit de s'implanter dans 15 nouveaux pays d'ici 2028 et de créer plus de 5 000 emplois directs.

Forte de 25 millions d'utilisateurs actifs au Sénégal, au Mali, en Côte d'Ivoire et au Burkina Faso, WaveGen a développé une solution de paiement mobile qui permet de réaliser des transactions instantanées à un coût quasi nul, même dans les zones les plus reculées.

Le fondateur et PDG de WaveGen, un jeune entrepreneur sénégalais de 32 ans, a déclaré : « Cette valorisation montre que le talent africain peut rivaliser avec les meilleurs au monde. Le Sénégal est en train de devenir le Silicon Valley de l'Afrique. »`,
    category: "Économie",
    author: authors[6],
    date: "2026-04-20T08:00:00",
    image: "/img/economie.jpg",
    readTime: 5,
    isFeatured: false,
    isTrending: true,
  },
  {
    id: "10",
    title: "Mangroves de Casamance : un programme de reboisement de 10 millions d'arbres lancé à Ziguinchor",
    excerpt:
      "Le programme « Casamance Verte » vise à restaurer 50 000 hectares de mangroves dégradées en Casamance, créant des milliers d'emplois écologiques pour les populations locales.",
    content: `La Casamance s'engage dans un programme environnemental sans précédent. Le gouvernement sénégalais, en partenariat avec l'UNESCO et plusieurs ONG internationales, a lancé le programme « Casamance Verte », un plan de reboisement de 10 millions de palétuviers sur cinq ans.

Le programme vise à restaurer 50 000 hectares de mangroves qui ont été dégradées par la sécheresse et la déforestation au cours des dernières décennies. Les mangroves jouent un rôle crucial dans la protection des côtes contre l'érosion, la séquestration du carbone et la préservation de la biodiversité marine.

Au-delà de son dimension environnemental, le programme est aussi un projet de développement social. Plus de 3 000 emplois écologiques seront créés dans les communautés locales, offrant une source de revenus durable aux populations rurales de Ziguinchor, Sédhiou et Kolda.

Les premières plantations ont déjà commencé dans la région de Bignona, où 500 000 palétuviers ont été mis en terre lors d'une cérémonie de lancement qui a réuni des centaines de volontaires et d'habitants.`,
    category: "Environnement",
    author: authors[8],
    date: "2026-04-19T11:00:00",
    image: "/img/goree.jpg",
    readTime: 4,
    isFeatured: false,
    isTrending: false,
  },
  {
    id: "11",
    title: "Transport aérien : Air Sénégal ouvre trois nouvelles lignes vers l'Europe et l'Asie",
    excerpt:
      "La compagnie nationale Air Sénégal a annoncé l'ouverture de lignes directes vers Paris-CDG, Londres-Heathrow et Dubaï, renforçant la connectivité du Sénégal avec le reste du monde.",
    content: `Air Sénégal poursuit son expansion internationale. La compagnie aérienne nationale a dévoilé ce mercredi son plan de développement 2026-2028, incluant l'ouverture de trois nouvelles lignes long-courriers : Dakar-Paris CDG (deux vols quotidiens), Dakar-Londres Heathrow (vol quotidien) et Dakar-Dubaï (trois vols hebdomadaires).

Ces nouvelles liaisons marquent une étape importante dans la stratégie de positionnement d'Air Sénégal comme hub aérien régional. La compagnie a récemment modernisé sa flotte avec l'acquisition de trois Airbus A350-900 neufs, capables de relier Dakar à n'importe quelle destination mondiale sans escale.

Le directeur général d'Air Sénégal a indiqué que ces nouvelles lignes créeront 500 emplois directs et devraient attirer 200 000 touristes supplémentaires par an au Sénégal, générant un impact économique estimé à 100 milliards de FCFA.

Les tarifs compétitifs annoncés, à partir de 250 000 FCFA aller-retour vers Paris, devraient rendre le Sénégal plus accessible à la diaspora et aux voyageurs d'affaires européens.`,
    category: "Économie",
    author: authors[2],
    date: "2026-04-19T09:30:00",
    image: "/img/economie.jpg",
    readTime: 4,
    isFeatured: false,
    isTrending: false,
  },
  {
    id: "12",
    title: "Éducation : le Sénégal généralise l'enseignement du code informatique dans le primaire",
    excerpt:
      "À la rentrée prochaine, tous les élèves du primaire du Sénégal recevront des cours de programmation informatique, faisant du pays un pionnier en Afrique dans l'éducation au numérique.",
    content: `Le Sénégal franchit un cap majeur dans la modernisation de son système éducatif. Le Ministère de l'Éducation nationale a annoncé la généralisation de l'enseignement du code informatique et de la pensée computationnelle dans toutes les écoles primaires du pays à compter de la rentrée scolaire de septembre 2026.

Cette mesure, qui concernera plus de 2 millions d'élèves, s'inscrit dans la stratégie nationale « Sénégal Numérique 2030 ». Le programme a été élaboré en collaboration avec des experts du MIT et de l'École Polytechnique Fédérale de Lausanne (EPFL), et adapté au contexte sénégalais.

Chaque école primaire sera équipée d'une salle informatique de 20 postes, et 5 000 enseignants seront formés cet été pour dispenser les cours. Les outils pédagogiques utilisés incluent Scratch, une plateforme de programmation visuelle adaptée aux enfants, et des robots éducatifs pour l'apprentissage par la pratique.

Le ministre de l'Éducation a souligné que « l'objectif est de former la prochaine génération de créateurs technologiques, pas seulement de consommateurs ».`,
    category: "Société",
    author: authors[5],
    date: "2026-04-18T15:00:00",
    image: "/img/societe.jpg",
    readTime: 5,
    isFeatured: false,
    isTrending: false,
  },
  {
    id: "13",
    title: "Basketball féminin : les Amazones du Sénégal remportent le championnat d'Afrique",
    excerpt:
      "L'équipe féminine de basketball du Sénégal a dominé la finale du championnat d'Afrique face au Nigeria, remportant le titre pour la 12e fois de leur histoire.",
    content: `Les Amazones du Sénégal ont une fois de plus prouvé leur suprématie sur le basketball féminin africain. En battant le Nigeria 78-62 en finale du championnat d'Afrique, les Sénégalaises ont décroché leur 12e titre continental, consolidant leur statut de nation dominante de la discipline.

Le match, disputé au Dakar Arena devant 15 000 spectateurs enthousiastes, a vu les Sénégalaises imposer leur rythme dès le premier quart-temps. La meneuse Aya Traoré, élue MVP du tournoi, a terminé la rencontre avec 28 points, 9 passes décisives et 7 rebonds.

L'entraîneuse des Amazones a félicité la détermination de ses joueuses : « Ces filles ont montré un caractère exceptionnel. Elles méritent ce titre et je suis fière de chacune d'entre elles. »

Cette victoire qualifie automatiquement le Sénégal pour les championnats du monde 2027 en Allemagne, où les Amazones espèrent améliorer leur performance de l'édition précédente.`,
    category: "Sport",
    author: authors[3],
    date: "2026-04-18T22:00:00",
    image: "/img/sport.jpg",
    readTime: 3,
    isFeatured: false,
    isTrending: false,
  },
  {
    id: "14",
    title: "Opinion : Le Sénégal doit investir massivement dans les énergies renouvelables",
    excerpt:
      "Face aux défis climatiques croissants, le Sénégal se doit d'accélérer sa transition énergétique. Notre éditorialiste propose un plan ambitieux pour un Sénégal vert d'ici 2035.",
    content: `Le Sénégal se trouve à un carrefour énergétique crucial. D'un côté, la demande en électricité croît de 8% par an, alimentée par une urbanisation rapide et un développement économique soutenu. De l'autre, les conséquences du changement climatique se font sentir de plus en plus, avec des sécheresses récurrentes et une montée du niveau de la mer qui menace les côtes dakaroises.

La solution est claire : le Sénégal doit transformer son mix énergétique. Actuellement dépendant à 70% des hydrocarbures importés, notre pays dispose pourtant d'un potentiel exceptionnel en énergie solaire (plus de 3 000 heures d'ensoleillement par an), éolien (notamment dans la Grande Côte) et hydraulique (barrage de Manantali).

Nous proposons un plan en trois phases. D'abord, doubler la capacité solaire installée d'ici 2028 pour atteindre 1 000 MW. Ensuite, lancer un programme d'électrification rurale basé sur des mini-réseaux solaires autonomes. Enfin, créer un fonds souverain de la transition énergétique, alimenté par une taxe carbone progressive sur les entreprises les plus polluantes.

L'urgence est réelle. Chaque année de retard coûte au Sénégal des milliards de FCFA en importations de pétrole et en coûts de santé liés à la pollution. Il est temps d'agir.`,
    category: "Environnement",
    author: authors[9],
    date: "2026-04-18T07:00:00",
    image: "/img/goree.jpg",
    readTime: 6,
    isFeatured: false,
    isTrending: false,
  },
  {
    id: "15",
    title: "Cinéma sénégalais : « Teranga Blues » remporte le Grand Prix au Festival de Cannes",
    excerpt:
      "Le réalisateur sénégalais Ousmane Mbaye a remporté le Grand Prix du Festival de Cannes avec son long-métrage « Teranga Blues », une ode vibrante à la jeunesse dakaroise.",
    content: `Le cinéma sénégalais entre dans l'histoire. Le film « Teranga Blues », réalisé par Ousmane Mbaye, a été couronné du Grand Prix au 79e Festival de Cannes, marquant la première fois qu'un film sénégalais reçoit cette distinction prestigieuse.

Le long-métrage, tourné entièrement à Dakar en wolof et en français, raconte l'histoire de trois jeunes Dakarois qui tentent de percer dans la musique hip-hop tout en naviguant les défis de la vie urbaine. Le jury, présidé par une cinéaste japonaise, a salué « une œuvre d'une puissance visuelle et émotionnelle rare ».

Ousmane Mbaye, 42 ans, troisième génération de cinéastes sénégalais après la lignée de Sembène Ousmane et Djibril Diop Mambéty, a dédié son prix « à tous les jeunes créateurs africains qui croient en leurs rêves malgré les obstacles ».

Au Sénégal, la nouvelle a provoqué une explosion de joie. Le Président a immédiatement annoncé la création d'un Fonds de Soutien au Cinéma Africain doté de 10 milliards de FCFA, et le film sera projeté en avant-première nationale au Cinéma Vox de Dakar.`,
    category: "Culture",
    author: authors[4],
    date: "2026-04-17T23:00:00",
    image: "/img/culture.jpg",
    readTime: 5,
    isFeatured: false,
    isTrending: true,
  },
  {
    id: "16",
    title: "Saint-Louis : le programme de sauvegarde du patrimoine colonial se concrétise",
    excerpt:
      "La ville historique de Saint-Louis lance un vaste plan de restauration de son patrimoine architectural colonial, classé à l'UNESCO, avec le soutien de la Banque Mondiale.",
    content: `Saint-Louis, la vieille capitale du Sénégal, entame une nouvelle phase de sa renaissance. La municipalité a annoncé le lancement concret du programme de sauvegarde du patrimoine architectural colonial, un plan de 25 milliards de FCFA financé conjointement par l'État sénégalais et la Banque Mondiale.

Le programme vise à restaurer plus de 200 bâtiments historiques du centre-ville, dont l'emblématique Pont Faidherbe, le Palais du Gouverneur et les maisons à arcades de l'île. Les travaux, qui s'étaleront sur quatre ans, seront réalisés par des artisans locaux formés aux techniques de restauration du patrimoine.

Au-delà de la restauration, le programme inclut la création d'un musée du patrimoine, l'aménagement d'un quartier des arts et d'un pôle touristique écologique. L'objectif est de faire de Saint-Louis une destination culturelle de premier plan en Afrique de l'Ouest, capable d'accueillir 500 000 touristes par an.

Le maire de Saint-Louis a souligné que ce programme est « un hommage à notre histoire commune » et qu'il permettra de créer 3 000 emplois directs dans le secteur du tourisme et de l'artisanat.`,
    category: "Culture",
    author: authors[4],
    date: "2026-04-17T14:00:00",
    image: "/img/goree.jpg",
    readTime: 4,
    isFeatured: false,
    isTrending: false,
  },
  {
    id: "17",
    title: "Politique internationale : le Sénégal médiateur dans la crise sahélienne",
    excerpt:
      "Macky Sall et le nouveau gouvernement sénégalais ont été sollicités pour jouer un rôle de médiateur dans les tensions croissantes entre pays sahéliens et la communauté internationale.",
    content: `Le Sénégal s'affirme de plus en plus comme un acteur diplomatique majeur sur la scène africaine et internationale. Le nouveau gouvernement a été sollicité par plusieurs chancelleries pour jouer un rôle de médiateur dans les tensions croissantes qui opposent certains pays sahéliens à la communauté internationale.

Le ministre sénégalais des Affaires étrangères a reçu ces derniers jours les émissaires de plusieurs pays concernés, et des consultations sont en cours pour organiser une conférence de paix à Dakar sous l'égide de la CEDEAO.

Le rôle de médiation du Sénégal est reconnu depuis longtemps. Le pays a déjà facilité plusieurs processus de paix dans la région, notamment en Guinée-Bissau et en République centrafricaine. Sa tradition démocratique et sa stabilité politique en font un interlocuteur naturel et crédible.

Des analystes internationaux saluent cette initiative sénégalaise comme « un exemple de diplomatie panafricaine constructive », notant que le choix de Dakar comme lieu de négociation reflète la confiance accordée au Sénégal par toutes les parties.`,
    category: "International",
    author: authors[7],
    date: "2026-04-17T10:00:00",
    image: "/img/hero-dakar.jpg",
    readTime: 5,
    isFeatured: false,
    isTrending: false,
  },
  {
    id: "18",
    title: "Opinion : La décentralisation, clé du développement du Sénégal",
    excerpt:
      "Pour que le Sénégal réalise son potentiel, il est urgent de transférer davantage de pouvoirs et de ressources aux collectivités locales. Notre éditorialiste plaide pour une réforme ambitieuse.",
    content: `Le Sénégal reste l'un des pays les plus centralisés d'Afrique de l'Ouest. Malgré les réformes successives, 80% des recettes publiques et 70% des décisions administratives sont encore concentrées à Dakar. Cette centralisation excessive freine le développement des régions et alimente l'exode rural.

La décentralisation n'est pas un simple transfert de compétences : c'est un changement de paradigme. Il s'agit de reconnaître que les collectivités locales sont les mieux placées pour identifier les besoins de leurs populations et concevoir des solutions adaptées.

Nous proposons une décentralisation en trois volets. D'abord, le transfert effectif de 30% des recettes fiscales aux collectivités locales, contre 10% actuellement. Ensuite, l'élection au suffrage universel direct des gouverneurs de région, pour renforcer la légitimité démocratique locale. Enfin, la création de pôles de développement régionaux autonomes, dotés de leurs propres stratégies économiques.

Les pays qui ont réussi leur décentralisation, comme le Maroc ou le Rwanda, en récoltent aujourd'hui les fruits. Le Sénégal ne peut plus se permettre d'attendre.`,
    category: "Politique",
    author: authors[9],
    date: "2026-04-16T07:00:00",
    image: "/img/politique.jpg",
    readTime: 6,
    isFeatured: false,
    isTrending: false,
  },
  {
    id: "19",
    title: "Économie bleue : le Sénégal signe un accord de 200 milliards pour l'exploitation durable des ressources marines",
    excerpt:
      "Un partenariat historique avec l'Union Européenne permettra au Sénégal de développer une économie bleue durable, avec des investissements dans la pêche, l'aquaculture et le tourisme côtier.",
    content: `Le Sénégal et l'Union Européenne ont signé un accord historique de 200 milliards de FCFA pour le développement de l'économie bleue sénégalaise. Ce partenariat, conclu lors d'une cérémonie à Bruxelles, prévoit des investissements massifs sur cinq ans dans la pêche durable, l'aquaculture, le tourisme côtier et la recherche océanographique.

L'accord inclut la création de trois zones marines protégées le long de la Petite Côte, le développement de fermes aquacoles de 10 000 tonnes par an, et la construction de deux ports de pêche modernes à Kayar et à Mbour. Des programmes de formation seront également mis en place pour 5 000 pêcheurs artisanaux.

Cet accord s'inscrit dans la stratégie nationale « Sénégal Économie Bleue 2035 », qui vise à faire du secteur maritime le deuxième pilier de l'économie nationale après les services. Le Sénégal dispose de 700 km de côtes et d'une Zone Économique Exclusive de 200 000 km² riche en ressources halieutiques.`,
    category: "Économie",
    author: authors[2],
    date: "2026-04-16T12:00:00",
    image: "/img/economie.jpg",
    readTime: 5,
    isFeatured: false,
    isTrending: false,
  },
  {
    id: "20",
    title: "Thiès : inauguration du plus grand parc industriel d'Afrique de l'Ouest",
    excerpt:
      "La zone industrielle de Thiès, d'une superficie de 2 000 hectares, accueillera plus de 200 entreprises et créera 50 000 emplois directs dans les prochaines années.",
    content: `La ville de Thiès a inauguré ce jeudi le plus grand parc industriel d'Afrique de l'Ouest, une zone économique spéciale de 2 000 hectares conçue pour attirer les investissements industriels et créer des emplois massifs dans la région.

Le parc, situé à 70 km de Dakar le long de l'autoroute Ila-Touba, dispose d'infrastructures de pointe : une centrale électrique de 100 MW, un réseau d'eau potable dédié, une gare de fret ferroviaire et une connexion fibre optique haut débit. Les premières entreprises, majoritairement dans l'agroalimentaire, la métallurgie et les matériaux de construction, ont déjà commencé leurs installations.

Plus de 200 entreprises sont attendues d'ici 2030, représentant un investissement total de 1 500 milliards de FCFA. Le parc devrait créer 50 000 emplois directs et 150 000 emplois indirects, transformant Thiès en un pôle industriel majeur de la sous-région.

Le gouverneur de la région de Thiès a qualifié ce projet de « révolution industrielle pour notre région », notant que les retombées se feront sentir bien au-delà de Thiès, avec la création de toute une chaîne de fournisseurs et de services.`,
    category: "Économie",
    author: authors[2],
    date: "2026-04-15T11:00:00",
    image: "/img/economie.jpg",
    readTime: 4,
    isFeatured: false,
    isTrending: false,
  },
];

export const featuredArticles = articles.filter((a) => a.isFeatured);
export const trendingArticles = articles.filter((a) => a.isTrending);
export const latestArticles = [...articles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export function getArticlesByCategory(category: Category): Article[] {
  return articles.filter((a) => a.category === category);
}

export function getArticleById(id: string): Article | undefined {
  return articles.find((a) => a.id === id);
}

export function getRelatedArticles(article: Article, limit = 3): Article[] {
  return articles
    .filter(
      (a) => a.id !== article.id && a.category === article.category
    )
    .slice(0, limit);
}

export function searchArticles(query: string): Article[] {
  const lower = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(lower) ||
      a.excerpt.toLowerCase().includes(lower) ||
      a.category.toLowerCase().includes(lower) ||
      a.author.name.toLowerCase().includes(lower)
  );
}
