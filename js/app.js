const $ = (selector) => document.querySelector(selector);
const screens = [...document.querySelectorAll(".screen")];
const navButtons = [...document.querySelectorAll("[data-nav]")];

function dismissSplash() {
  const splash = $("#splash-screen");
  if (!splash || splash.classList.contains("is-leaving")) return;
  splash.classList.add("is-leaving");
  splash.addEventListener("animationend", () => splash.classList.add("is-hidden"), { once: true });
}

window.addEventListener("load", () => window.setTimeout(dismissSplash, 850));
window.setTimeout(dismissSplash, 2500);

const modeCatalog = {
  walkthrough: { name: "Genomgång", description: "Lär dig steg för steg", icon: "▶" },
  rules: { name: "Regler och begrepp", description: "Välj rätt regel eller begrepp", icon: "?" },
  calculate: { name: "Räkna ut", description: "Välj rätt svar", icon: "=" },
  missing: { name: "Saknat tal", description: "Fyll i det som saknas", icon: "□" },
  truefalse: { name: "Sant eller falskt", description: "Bedöm matematiska påståenden", icon: "✓" },
  quick: { name: "Snabbträning", description: "Flera frågor i följd", icon: "⏱" },
  order: { name: "Ordna", description: "Hitta rätt ordning", icon: "↕" },
  methods: { name: "Förstå metoden", description: "Välj och förklara ett arbetssätt", icon: "→" },
};

const q = (prompt, example, choices, correct, explanation, levels = ["high"]) => ({
  prompt, example, choices, correct, explanation, levels,
});

const topics = {
  operationLanguage: {
    title: "Räknesättens språk",
    description: "Förstå orden term, summa, faktor och kvot.",
    levels: ["high"],
    languageFocused: true,
    walkthrough: [
      ["Ord för olika roller", "Talens roller", "Matematikord berättar vad talen gör och vad resultatet kallas.", "Skilj på talen du arbetar med och resultatet du får."],
      ["Lägga ihop och ta skillnaden", "Term → summa eller differens", "Tal som adderas eller subtraheras kallas termer. Resultatet heter summa vid addition och differens vid subtraktion.", "Ordet term hör alltså till två räknesätt. Resultatets namn visar vilket du använder."],
      ["Multiplicera", "Faktorer → produkt", "Talen som multipliceras kallas faktorer. Resultatet kallas produkt.", "En faktor är en del av beräkningen. Produkten är det du får fram."],
      ["Dividera", "Täljare, nämnare och kvot", "I en division skriven som ett bråk står täljaren över bråkstrecket och nämnaren under. Resultatet kallas kvot.", "Täljaren är talet som delas. Nämnaren är talet du delar med och får inte vara noll."],
    ],
    modes: {
      rules: [
        q("Vad heter resultatet?", "Addition", ["Summa", "Produkt", "Term"], 0, "Vid addition lägger du ihop termer. Resultatet kallas summa.", ["high"]),
        q("Vad heter resultatet?", "Subtraktion", ["Kvot", "Differens", "Faktor"], 1, "Resultatet av en subtraktion kallas differens.", ["high"]),
        q("Vad heter talen som multipliceras?", "Multiplikation", ["Termer", "Kvoter", "Faktorer"], 2, "Talen som multipliceras är faktorer. Resultatet är en produkt.", ["high"]),
        q("Vad heter resultatet?", "Division", ["Kvot", "Nämnare", "Differens"], 0, "Kvoten är resultatet av divisionen.", ["high"]),
        q("Vilket ord passar?", "Tal som adderas", ["Produkter", "Termer", "Faktorer"], 1, "Talen som adderas kallas termer. Även tal i en subtraktion kallas termer.", ["high"]),
        q("Vilket ord passar?", "Ovanför bråkstrecket", ["Kvot", "Nämnare", "Täljare"], 2, "Täljaren står ovanför bråkstrecket. Nämnaren står under.", ["high"]),
        q("Vilket ord passar?", "Under bråkstrecket", ["Nämnare", "Produkt", "Täljare"], 0, "Nämnaren står under bråkstrecket och är talet du delar med.", ["high"]),
        q("Vilket räknesätt menas?", "Bestäm produkten", ["Addition", "Multiplikation", "Division"], 1, "Att bestämma produkten betyder att multiplicera faktorerna.", ["high"]),
        q("Vilket räknesätt menas?", "Bestäm differensen", ["Multiplikation", "Addition", "Subtraktion"], 2, "Differensen är skillnaden som du får genom subtraktion.", ["high"]),
        q("Vilken beskrivning stämmer?", "Faktor och produkt", ["Faktorer multipliceras till en produkt", "Produkter adderas till en faktor", "En faktor är alltid resultatet"], 0, "Faktor beskriver talets roll före resultatet. Produkt är resultatets namn.", ["high"]),
      ],
      truefalse: [
        q("Sant eller falskt?", "En summa är ett resultat", ["Sant", "Falskt"], 0, "Summan är resultatet när termer adderas.", ["high"]),
        q("Sant eller falskt?", "Termer finns bara i addition", ["Sant", "Falskt"], 1, "Tal som subtraheras kallas också termer.", ["high"]),
        q("Sant eller falskt?", "Produkt och kvot betyder samma sak", ["Sant", "Falskt"], 1, "Produkt hör till multiplikation. Kvot hör till division.", ["high"]),
        q("Sant eller falskt?", "Nämnaren är talet du delar med", ["Sant", "Falskt"], 0, "När division skrivs som ett bråk är nämnaren talet du delar med.", ["high"]),
      ],
    },
  },
  calculationMethods: {
    title: "Förstå räknemetoder",
    description: "Välj en metod och förklara varför den fungerar.",
    levels: ["high"],
    languageFocused: true,
    walkthrough: [
      ["En metod har en anledning", "Gör beräkningen enklare", "En räknemetod ändrar hur du räknar. Den ska bevara resultatet.", "Fråga både vad som ändras och varför svaret blir detsamma."],
      ["Bevara summan", "Öka en term, minska den andra", "Vid addition kan du öka den ena termen och minska den andra lika mycket.", "Det du lägger till på ett ställe tar du bort på det andra. Summan bevaras."],
      ["Bevara differensen", "Ändra båda lika mycket", "Vid subtraktion kan du öka båda termerna lika mycket eller minska båda lika mycket.", "Tänk på avståndet mellan två punkter på en tallinje. Om båda flyttas lika långt åt samma håll är avståndet kvar."],
      ["Bevara produkten", "Dubbla och halvera", "Dubbla den ena faktorn och halvera den andra. Produkten blir densamma.", "Dubbelt så många grupper med hälften så mycket i varje ger samma mängd totalt."],
      ["Bevara kvoten", "Ändra båda på samma sätt", "Multiplicera täljare och nämnare med samma tal, som inte är noll. Kvoten bevaras.", "Du kan också dividera båda med samma tal, som inte är noll. Att dubbla båda är ett exempel."],
    ],
    modes: {
      methods: [
        q("Vilken metod beskrivs?", "Lägg ihop ental för sig och tiotal för sig", ["Addera talsort för talsort", "Dubbla och halvera", "Räkna upp med addition"], 0, "Du delar upp termerna efter talsort och lägger sedan ihop delresultaten.", ["high"]),
        q("Vad bevarar summan?", "Öka den ena termen", ["Öka den andra lika mycket", "Minska den andra lika mycket", "Låt den andra vara oförändrad"], 1, "För att summan ska vara kvar måste du ta bort lika mycket som du lägger till.", ["high"]),
        q("Vad bevarar differensen?", "Öka den första termen", ["Halvera den andra", "Minska den andra lika mycket", "Öka den andra lika mycket"], 2, "När båda termerna ökar lika mycket är skillnaden mellan dem oförändrad.", ["high"]),
        q("Vilken metod beskrivs?", "Räkna från det mindre talet till det större", ["Räkna upp med addition", "Multiplicera delarna", "Dubbla båda talen"], 0, "För att hitta skillnaden kan du lägga ihop stegen från det mindre talet till det större.", ["high"]),
        q("Vad är nästa steg?", "Dela upp en faktor i en summa", ["Multiplicera bara den första delen", "Multiplicera varje del med den andra faktorn", "Addera den andra faktorn till varje del"], 1, "Varje del måste multipliceras med den andra faktorn. Sedan adderar du delprodukterna.", ["high"]),
        q("Vad bevarar produkten?", "Dubbla den ena faktorn", ["Dubbla den andra", "Låt den andra vara kvar", "Halvera den andra"], 2, "Dubbleringen och halveringen tar ut varandra, så produkten bevaras.", ["high"]),
        q("Vad bevarar kvoten?", "Dubbla nämnaren", ["Dubbla även täljaren", "Halvera täljaren", "Låt täljaren vara kvar"], 0, "Täljare och nämnare måste ändras med samma faktor för att kvoten ska bevaras.", ["high"]),
        q("Varför används metoden?", "Skaffa heltal i nämnaren", ["För att alltid göra svaret större", "För att göra divisionen enklare", "För att ta bort täljaren"], 1, "Du kan göra divisionen enklare genom att multiplicera båda talen med samma tiopotens tills nämnaren är ett heltal.", ["high"]),
      ],
      truefalse: [
        q("Sant eller falskt?", "Dubbla båda faktorerna för att bevara produkten", ["Sant", "Falskt"], 1, "Dubbla och halvera är metoden som bevarar produkten. Att dubbla båda gör inte det.", ["high"]),
        q("Sant eller falskt?", "Lika stor ökning av båda termerna bevarar differensen", ["Sant", "Falskt"], 0, "Skillnaden är kvar när båda termerna flyttas lika mycket åt samma håll.", ["high"]),
        q("Sant eller falskt?", "Vid uppdelning räcker det att multiplicera en del", ["Sant", "Falskt"], 1, "Alla delar måste multipliceras med den andra faktorn. Annars saknas en del av produkten.", ["high"]),
        q("Sant eller falskt?", "En användbar metod kan ge samma svar med enklare steg", ["Sant", "Falskt"], 0, "Metoden hjälper dig att räkna enklare samtidigt som resultatet bevaras.", ["high"]),
      ],
    },
  },
  powers10: {
    title: "Multiplicera med 10, 100 och 1000",
    description: "Förstå nollregeln och räkna med tiopotenser.",
    walkthrough: [
      ["Räkna nollorna", "10 · 100 · 1000", "10 har en nolla, 100 har två och 1000 har tre.", "För heltal visar antalet nollor hur många platser siffrorna flyttas åt vänster."],
      ["Multiplicera med 10", "7 × 10 = 70", "Lägg till en nolla efter heltalet.", "Sjuan går från entalsplatsen till tiotalsplatsen."],
      ["Multiplicera med 100", "7 × 100 = 700", "Lägg till två nollor efter heltalet.", "Sjuan får ett hundra gånger större platsvärde."],
      ["Multiplicera med 1000", "7 × 1000 = 7000", "Lägg till tre nollor efter heltalet.", "Sjuan hamnar på tusentalsplatsen."],
    ],
    modes: {
      rules: [q("Vilken regel gäller?", "7 × 100", ["Lägg till 1 nolla", "Lägg till 2 nollor", "Lägg till 3 nollor"], 1, "100 har två nollor, så 7 × 100 = 700."), q("Vilken regel gäller?", "9 × 1000", ["Lägg till 3 nollor", "Lägg till 2 nollor", "Lägg till 1 nolla"], 0, "1000 har tre nollor, så 9 × 1000 = 9000.")],
      calculate: [q("Vad blir svaret?", "8 × 10", ["80", "800", "18"], 0, "Multiplicera med 10 genom att lägga till en nolla."), q("Vad blir svaret?", "12 × 100", ["120", "1200", "12000"], 1, "100 har två nollor: 12 × 100 = 1200."), q("Vad blir svaret?", "6 × 1000", ["600", "6000", "60000"], 1, "1000 har tre nollor: 6 × 1000 = 6000.")],
      missing: [q("Vilket tal saknas?", "7 × □ = 700", ["10", "100", "1000"], 1, "700 är hundra gånger större än 7."), q("Vilket tal saknas?", "4 × □ = 4000", ["1000", "100", "10"], 0, "4 × 1000 = 4000.")],
      truefalse: [q("Sant eller falskt?", "15 × 100 = 1500", ["Sant", "Falskt"], 0, "Två nollor läggs efter 15."), q("Sant eller falskt?", "3 × 1000 = 300", ["Sant", "Falskt"], 1, "3 × 1000 är 3000, inte 300.")],
    },
  },
  area: {
    title: "Area och omkrets",
    description: "Räkna på rektanglar och skilj mellan yta och sträcka.",
    walkthrough: [
      ["Två olika mått", "Omkrets ≠ area", "Omkrets är sträckan runt en figur. Area är ytan inuti.", "Tänk staket för omkrets och gräs för area."],
      ["Rektangelns omkrets", "O = 2 × längd + 2 × bredd", "Lägg ihop figurens fyra sidor.", "Motstående sidor är lika långa."],
      ["Rektangelns area", "A = längd × bredd", "Multiplicera längden med bredden.", "Enheten blir kvadratisk, till exempel cm²."],
    ],
    modes: {
      rules: [q("Vilket begrepp beskriver ytan inuti?", "Ytan inuti figuren", ["Area", "Omkrets", "Diameter"], 0, "Area beskriver hur stor ytan är."), q("Vilken enhet passar för area?", "Area av ett rum", ["m", "m²", "m³"], 1, "Area mäts i kvadratenheter, exempelvis m².")],
      calculate: [q("Vad är rektangelns area?", "6 cm × 4 cm", ["10 cm²", "20 cm²", "24 cm²"], 2, "6 × 4 = 24 cm²."), q("Vad är omkretsen?", "Längd 5 m · bredd 3 m", ["8 m", "15 m", "16 m"], 2, "5 + 3 + 5 + 3 = 16 m.")],
      missing: [q("Vilken längd saknas?", "Area 24 cm² · bredd 4 cm", ["5 cm", "6 cm", "8 cm"], 1, "24 ÷ 4 = 6 cm.")],
      truefalse: [q("Sant eller falskt?", "Area mäts i cm²", ["Sant", "Falskt"], 0, "Area mäts i kvadratenheter."), q("Sant eller falskt?", "3 cm × 5 cm ger arean 8 cm²", ["Sant", "Falskt"], 1, "Arean är 3 × 5 = 15 cm².")],
    },
  },
  percent: {
    title: "Procent av ett tal",
    description: "Beräkna 10 %, 25 %, 50 % och andra vanliga andelar.",
    walkthrough: [
      ["Procent betyder hundradel", "1 % = 1/100", "Procent visar hur många hundradelar vi menar.", "25 % betyder 25 av 100, alltså en fjärdedel."],
      ["Hitta 10 procent", "10 % av 300 = 30", "Dela talet med 10.", "300 ÷ 10 = 30."],
      ["Hitta 50 procent", "50 % av 80 = 40", "50 procent är samma sak som hälften.", "Dela talet med 2."],
      ["Bygg fler procent", "20 % = 10 % + 10 %", "Använd enkla andelar för att bygga svaret.", "10 % av 150 är 15, alltså är 20 % 30."],
    ],
    modes: {
      rules: [q("Vad betyder 50 %?", "50 %", ["Hälften", "En fjärdedel", "Dubbelt"], 0, "50 av 100 är hälften."), q("Hur hittar du 10 %?", "10 % av ett tal", ["Dela med 10", "Multiplicera med 10", "Dela med 2"], 0, "En tiondel är 10 procent.")],
      calculate: [q("Hur mycket är 25 %?", "25 % av 200", ["25", "50", "75"], 1, "25 % är en fjärdedel och 200 ÷ 4 = 50."), q("Hur mycket är 10 %?", "10 % av 450", ["45", "4,5", "90"], 0, "450 ÷ 10 = 45."), q("Hur mycket är 50 %?", "50 % av 70", ["20", "35", "50"], 1, "Hälften av 70 är 35.")],
      missing: [q("Vilken procentsats saknas?", "□ av 80 = 40", ["10 %", "25 %", "50 %"], 2, "40 är hälften av 80, alltså 50 %.")],
      truefalse: [q("Sant eller falskt?", "20 % av 100 är 20", ["Sant", "Falskt"], 0, "20 hundradelar av 100 är 20."), q("Sant eller falskt?", "10 % av 60 är 10", ["Sant", "Falskt"], 1, "10 % av 60 är 6.")],
    },
  },
  statistics: {
    title: "Medelvärde, median och typvärde",
    description: "Sammanfatta och jämför tal i en datamängd.",
    walkthrough: [
      ["Tre lägesmått", "Medelvärde · median · typvärde", "De beskriver en datamängd på olika sätt.", "Vilket mått som passar bäst beror på talen och frågan."],
      ["Medelvärde", "(2 + 4 + 6) ÷ 3 = 4", "Addera talen och dela med hur många de är.", "Summan är 12 och det finns tre tal."],
      ["Median", "2, 5, 9 → 5", "Ordna talen och välj det mittersta.", "Vid jämnt antal tal tar du medelvärdet av de två mittersta."],
      ["Typvärde", "2, 3, 3, 7 → 3", "Typvärdet är talet som förekommer flest gånger.", "En datamängd kan ha flera typvärden eller inget alls."],
    ],
    modes: {
      rules: [q("Vilket mått är det mittersta talet?", "Tal i storleksordning", ["Median", "Medelvärde", "Typvärde"], 0, "Medianen är det mittersta talet."), q("Vilket mått förekommer flest gånger?", "Det vanligaste värdet", ["Medelvärde", "Typvärde", "Median"], 1, "Typvärdet är vanligast.")],
      calculate: [q("Vad är medelvärdet?", "2, 4, 6", ["3", "4", "6"], 1, "(2 + 4 + 6) ÷ 3 = 4."), q("Vad är medianen?", "1, 3, 8, 10, 12", ["3", "8", "10"], 1, "8 står i mitten.")],
      truefalse: [q("Sant eller falskt?", "Typvärdet i 2, 2, 5 är 2", ["Sant", "Falskt"], 0, "2 förekommer flest gånger."), q("Sant eller falskt?", "Medianen i 1, 4, 9 är 4", ["Sant", "Falskt"], 0, "4 är talet i mitten.")],
      order: [q("Vilken ordning är stigande?", "5 · 1 · 3", ["1, 3, 5", "5, 3, 1", "3, 1, 5"], 0, "Stigande ordning går från minst till störst."), q("Ordna inför medianen", "8 · 2 · 6", ["8, 6, 2", "2, 6, 8", "6, 2, 8"], 1, "2, 6, 8 är rätt ordning och medianen är 6.")],
    },
  },
  probability: {
    title: "Enkel sannolikhet",
    description: "Räkna möjliga och gynnsamma utfall.",
    walkthrough: [
      ["Möjliga utfall", "En tärning: 1, 2, 3, 4, 5, 6", "Börja med att hitta alla möjliga resultat.", "En vanlig tärning har sex lika sannolika utfall."],
      ["Gynnsamma utfall", "Jämnt tal: 2, 4, 6", "Gynnsamma utfall är de resultat vi vill få.", "Tre av tärningens sex utfall är jämna."],
      ["Skriv sannolikheten", "3 av 6 = 1/2 = 50 %", "Dela gynnsamma utfall med möjliga utfall.", "Bråket 3/6 kan förkortas till 1/2."],
    ],
    modes: {
      rules: [q("Vad är ett gynnsamt utfall?", "Vi vill slå en sexa", ["Att få 6", "Alla sex tal", "Att kasta tärningen"], 0, "Det gynnsamma utfallet är resultatet vi vill ha."), q("Vad betyder omöjlig händelse?", "Sannolikhet 0", ["Kan inte inträffa", "Inträffar alltid", "Inträffar hälften av gångerna"], 0, "Sannolikheten för en omöjlig händelse är 0.")],
      calculate: [q("Vad är sannolikheten?", "Få krona med ett rättvist mynt", ["1/2", "1/3", "1"], 0, "Ett av två möjliga utfall är krona."), q("Vad är sannolikheten?", "Slå en sexa med en tärning", ["1/2", "1/6", "6"], 1, "Ett av sex möjliga utfall är en sexa.")],
      missing: [q("Hur många gynnsamma utfall finns?", "Slå ett jämnt tal med en tärning", ["2", "3", "6"], 1, "De jämna utfallen är 2, 4 och 6.")],
      truefalse: [q("Sant eller falskt?", "Sannolikheten för krona är 50 %", ["Sant", "Falskt"], 0, "Ett rättvist mynt har två lika sannolika sidor."), q("Sant eller falskt?", "Man kan slå 7 med en vanlig tärning", ["Sant", "Falskt"], 1, "En vanlig tärning visar 1 till 6.")],
    },
  },
  algebra: {
    title: "Lösa enkla ekvationer",
    description: "Hitta det okända talet och kontrollera lösningen.",
    walkthrough: [
      ["En ekvation är en balans", "x + 3 = 8", "Båda sidor om likhetstecknet har samma värde.", "Gör du något på ena sidan måste du göra samma på den andra."],
      ["Använd motsatt räknesätt", "x + 3 − 3 = 8 − 3", "Ta bort 3 genom att subtrahera 3 på båda sidor.", "Plus och minus är motsatta räknesätt."],
      ["Lös och kontrollera", "x = 5 → 5 + 3 = 8", "Sätt in svaret för att se att likheten stämmer.", "Kontrollen visar att 5 är rätt lösning."],
    ],
    modes: {
      rules: [q("Vilket räknesätt löser ekvationen?", "x + 7 = 12", ["Subtrahera 7", "Addera 7", "Multiplicera med 7"], 0, "Använd motsatt räknesätt: subtrahera 7."), q("Vad måste bevaras?", "En ekvation", ["Balansen", "Talens ordning", "Det största talet"], 0, "Gör samma sak på båda sidor så bevaras balansen.")],
      calculate: [q("Vad är x?", "x + 4 = 11", ["5", "7", "15"], 1, "11 − 4 = 7."), q("Vad är x?", "3x = 18", ["6", "15", "54"], 0, "18 ÷ 3 = 6."), q("Vad är x?", "x − 5 = 9", ["4", "14", "45"], 1, "9 + 5 = 14.")],
      missing: [q("Vilket tal saknas?", "□ + 6 = 10", ["4", "6", "16"], 0, "10 − 6 = 4."), q("Vilket tal saknas?", "5 × □ = 20", ["2", "4", "15"], 1, "20 ÷ 5 = 4.")],
      truefalse: [q("Sant eller falskt?", "x + 2 = 7 ger x = 5", ["Sant", "Falskt"], 0, "5 + 2 = 7."), q("Sant eller falskt?", "2x = 10 ger x = 8", ["Sant", "Falskt"], 1, "10 ÷ 2 = 5, alltså är x = 5.")],
    },
  },
};

Object.values(topics).forEach((topic) => {
  topic.levels ??= ["high"];
  topic.modes.quick = topic.languageFocused
    ? [...(topic.modes.rules || []), ...(topic.modes.methods || []), ...(topic.modes.truefalse || [])]
    : [...(topic.modes.calculate || []), ...(topic.modes.truefalse || [])];
});

const highCategories = [
  { id: "numbers", title: "Tal", description: "Taluppfattning och räknesätt", subcategories: [
  {
    "id": "number-sense",
    "title": "Taluppfattning",
    "description": "Tiosystemet, tallinjen och decimaltal.",
    "topicIds": [],
    "keywords": "positionssystem ental tiotal hundratal tiondelar hundradelar storleksordna"
  },
  {
    "id": "operations",
    "title": "De fyra räknesätten",
    "description": "Begrepp, räknemetoder och prioriteringsregler.",
    "topicIds": [
      "operationLanguage",
      "calculationMethods"
    ],
    "keywords": "addition subtraktion multiplikation division parenteser"
  },
  {
    "id": "rounding",
    "title": "Avrundning och överslag",
    "description": "Närmevärden och rimliga uppskattningar.",
    "topicIds": [],
    "keywords": "avrunda avrundningssiffra överslagsräkning"
  },
  {
    "id": "decimal-operations",
    "title": "Tiopotenser och decimalräkning",
    "description": "Multiplicera och dividera med tio, hundra, tusen och decimaltal.",
    "topicIds": [
      "powers10"
    ],
    "keywords": "10 100 1000 decimaltecken"
  },
  {
    "id": "negative",
    "title": "Negativa tal",
    "description": "Tallinjen, motsatta tal och teckenregler.",
    "topicIds": [],
    "keywords": "positiva tal minus"
  },
  {
    "id": "powers-roots",
    "title": "Potenser och rötter",
    "description": "Bas, exponent, grundpotensform och kvadratrot.",
    "topicIds": [],
    "keywords": "upphöjt kvadrattal roten ur"
  },
  {
    "id": "prefixes",
    "title": "Prefix",
    "description": "Namn och beteckningar för stora och små tal.",
    "topicIds": [],
    "keywords": "kilo mega giga deci centi milli mikro"
  }
] },
  { id: "geometry", title: "Geometri", description: "Former, mått och samband", subcategories: [
  {
    "id": "angles-shapes",
    "title": "Vinklar och former",
    "description": "Vinklar, trianglar, fyrhörningar och cirklar.",
    "topicIds": [],
    "keywords": "vinkelsumma spetsig rät trubbig diameter radie"
  },
  {
    "id": "perimeter-area",
    "title": "Omkrets och area",
    "description": "Sträckan runt en figur och ytan inuti.",
    "topicIds": [
      "area"
    ],
    "keywords": "rektangel cirkel triangel bas höjd"
  },
  {
    "id": "units",
    "title": "Längd och enheter",
    "description": "Mätning och omvandling av längdenheter.",
    "topicIds": [],
    "keywords": "meter centimeter millimeter kilometer mil"
  },
  {
    "id": "scale-symmetry",
    "title": "Skala och symmetri",
    "description": "Avbildningar, förstoring, förminskning och symmetri.",
    "topicIds": [],
    "keywords": "spegling rotation verklighet bild"
  },
  {
    "id": "pythagoras",
    "title": "Pythagoras sats",
    "description": "Sambandet mellan sidorna i en rätvinklig triangel.",
    "topicIds": [],
    "keywords": "hypotenusa kateter"
  },
  {
    "id": "volume",
    "title": "Volym och rymdgeometri",
    "description": "Kroppar, volym och volymenheter.",
    "topicIds": [],
    "keywords": "rätblock kub cylinder liter deciliter centiliter milliliter"
  }
] },
  { id: "percent", title: "Procent", description: "Andelar och förändringar", subcategories: [
  {
    "id": "fractions",
    "title": "Bråk",
    "description": "Andelar, bråkformer och att räkna med bråk.",
    "topicIds": [],
    "keywords": "täljare nämnare förkorta förlänga blandad form"
  },
  {
    "id": "percent-basics",
    "title": "Förstå procent",
    "description": "Hundradelar och sambandet mellan andel, del och helhet.",
    "topicIds": [
      "percent"
    ],
    "keywords": "procentform decimalform hälften fjärdedel"
  },
  {
    "id": "percent-change",
    "title": "Förändring och ränta",
    "description": "Procentuell förändring, förändringsfaktor och ränta.",
    "topicIds": [],
    "keywords": "rabatt ökning minskning lån årsränta"
  }
] },
  { id: "statistics", title: "Statistik", description: "Data och lägesmått", subcategories: [
  {
    "id": "tables-charts",
    "title": "Tabeller och diagram",
    "description": "Samla, läsa och granska statistiskt material.",
    "topicIds": [],
    "keywords": "frekvens frekvenstabell stapeldiagram stolpdiagram cirkeldiagram linjediagram vilseledande"
  },
  {
    "id": "averages",
    "title": "Lägesmått",
    "description": "Beskriv och jämför en datamängd.",
    "topicIds": [
      "statistics"
    ],
    "keywords": "medelvärde median typvärde"
  }
] },
  { id: "probability", title: "Sannolikhet", description: "Slump och möjliga utfall", subcategories: [
  {
    "id": "outcomes",
    "title": "Händelser och utfall",
    "description": "Chans, risk och enkel sannolikhet.",
    "topicIds": [
      "probability"
    ],
    "keywords": "gynnsamma möjliga säkert omöjligt tärning mynt"
  },
  {
    "id": "multiple-events",
    "title": "Flera händelser",
    "description": "Räkna med sannolikhet i flera steg.",
    "topicIds": [],
    "keywords": "återläggning träddiagram"
  },
  {
    "id": "combinations",
    "title": "Kombinatorik",
    "description": "Räkna möjliga kombinationer och placeringar.",
    "topicIds": [],
    "keywords": "ordning urval handskakning"
  }
] },
  { id: "algebra", title: "Algebra", description: "Uttryck och ekvationer", subcategories: [
  {
    "id": "expressions",
    "title": "Variabler och uttryck",
    "description": "Bokstäver, mönster, förenkling och parenteser.",
    "topicIds": [],
    "keywords": "sifferterm bokstavsterm talföljd"
  },
  {
    "id": "equations",
    "title": "Likheter och ekvationer",
    "description": "Balans, okända tal och ekvationslösning.",
    "topicIds": [
      "algebra"
    ],
    "keywords": "balansmetoden motsatt räknesätt"
  },
  {
    "id": "formulas",
    "title": "Formler och problemlösning",
    "description": "Beskriv samband och lös problem i flera steg.",
    "topicIds": [],
    "keywords": "hastighet sträcka tid kilopris literpris per redovisa rimlighet"
  },
  {
    "id": "functions",
    "title": "Koordinater och funktioner",
    "description": "Koordinatsystem, linjära samband och proportionalitet.",
    "topicIds": [],
    "keywords": "origo x-axel y-axel graf lutning startvärde räta linjens ekvation"
  }
] },
];

const curriculum = {
  high: { name: "Högstadiet", categories: highCategories },
  middle: { name: "Mellanstadiet", categories: highCategories },
};

const wisdoms = [
  "Förklara lösningen högt för dig själv – då märker du snabbt vad du verkligen förstår.",
  "Ett fel är inte ett misslyckande. Det visar exakt vad du kan träna på härnäst.",
  "Rita en bild när talen känns abstrakta. En enkel skiss kan göra sambandet tydligt.",
  "Träna kort och ofta. Tio fokuserade minuter kan ge mer än ett långt pass ibland.",
  "Kontrollera svaret med en annan metod när du kan. Då tränar du både säkerhet och förståelse.",
  "Fråga inte bara vad svaret är – fråga varför metoden fungerar.",
];

let level = localStorage.getItem("mathclass-level") || "high";
let activeScreen = "home";
let selectedCategory = null;
let selectedTopic = null;
let selectedSubcategory = null;
let modeOrigin = "topics";
let subcategoryOrigin = "subcategories";
let currentMode = null;
let questionIndex = 0;
let walkthroughIndex = 0;
let quickScore = 0;
let topicsOrigin = "home";
let settingsOrigin = "home";
let touchStartY = null;
let touchCurrentY = null;
let touchStartedAt = 0;
let swipeAnimating = false;
let wheelLocked = false;

function showScreen(name) {
  screens.forEach((screen) => {
    const active = screen.id === `${name}-screen`;
    screen.hidden = !active;
    screen.classList.toggle("is-active", active);
  });
  activeScreen = name;
  navButtons.forEach((button) => button.classList.toggle("is-active", button.dataset.nav === name));
  const heading = $(`#${name}-screen h1`);
  if (heading) setTimeout(() => heading.focus({ preventScroll: true }), 0);
}

function renderHome() {
  renderSearch("home");
  const data = progressData()[level] || {};
  const available = availableTopics();
  const latest = data.latestTopicId ? topics[data.latestTopicId] : null;
  const latestCategory = data.latestCategoryId ? categoryById(data.latestCategoryId) : null;
  const recommendation = available.find((item) => item.topicId !== data.latestTopicId) || available[0];
  configureFeaturedButton($("#continue-button"), latestCategory, data.latestTopicId, latest ? latest.title : "Börja träna", latest ? latest.description : `Öppna Bibliotek för material i ${curriculum[level].name.toLowerCase()}.`);
  configureFeaturedButton($("#recommendation-button"), recommendation?.category, recommendation?.topicId, recommendation ? topics[recommendation.topicId].title : "Nytt material kommer", recommendation ? topics[recommendation.topicId].description : "Det finns ännu inget material för den valda nivån.");
  $("#math-wisdom").textContent = wisdoms[Math.floor(Math.random() * wisdoms.length)];
}

function categoryById(id) {
  return curriculum[level].categories.find((category) => category.id === id);
}

function topicIdsFor(category) {
  const ids = category.subcategories ? category.subcategories.flatMap((group) => group.topicIds) : category.topicIds;
  return ids.filter((topicId) => topics[topicId]?.levels.includes(level));
}

function availableTopics() {
  return curriculum[level].categories.flatMap((category) => topicIdsFor(category).map((topicId) => ({ category, topicId })));
}

function configureFeaturedButton(button, category, topicId, title, description) {
  button.innerHTML = `<strong>${title}</strong><small>${description}</small>`;
  button.disabled = false;
  button.onclick = category && topicId ? () => { selectedCategory = category; topicsOrigin = "home"; openTopic(topicId, "home"); } : () => { renderLibrary(); showScreen("library"); };
}

function sectionButton(title, description, status, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "list-button";
  const text = document.createElement("span");
  const heading = document.createElement("strong");
  heading.textContent = title;
  const detail = document.createElement("small");
  detail.textContent = description;
  text.append(heading, detail);
  if (status) {
    const badge = document.createElement("small");
    badge.className = "section-status";
    badge.textContent = status;
    text.append(badge);
  }
  const arrow = document.createElement("b");
  arrow.textContent = "›";
  arrow.setAttribute("aria-hidden", "true");
  button.append(text, arrow);
  button.addEventListener("click", onClick);
  return button;
}

function openCategory(categoryId, origin = "library") {
  selectedCategory = categoryById(categoryId);
  topicsOrigin = origin;
  $("#subcategories-eyebrow").textContent = curriculum[level].name;
  $("#subcategories-heading").textContent = selectedCategory.title;
  $("#subcategories-introduction").textContent = "Välj en underkategori. Här samlas momenten steg för steg.";
  const list = $("#subcategory-list");
  list.replaceChildren();
  selectedCategory.subcategories.forEach((group) => {
    const count = topicIdsFor(group).length;
    list.append(sectionButton(group.title, group.description, count ? `${count} moment att träna` : "Kommer senare", () => openSubcategory(group.id)));
  });
  $("#back-from-subcategories").setAttribute("aria-label", origin === "home" ? "Tillbaka till Hem" : "Tillbaka till Bibliotek");
  showScreen("subcategories");
}

function openSubcategory(groupId, origin = "subcategories") {
  selectedSubcategory = selectedCategory.subcategories.find((group) => group.id === groupId);
  subcategoryOrigin = origin;
  $("#topics-eyebrow").textContent = `${curriculum[level].name} · ${selectedCategory.title}`;
  $("#topics-heading").textContent = selectedSubcategory.title;
  $("#topics-introduction").textContent = selectedSubcategory.description;
  $("#back-from-topics").setAttribute("aria-label", origin === "subcategories" ? `Tillbaka till ${selectedCategory.title}` : "Tillbaka till sökresultaten");
  const list = $("#topic-list");
  list.replaceChildren();
  const availableIds = topicIdsFor(selectedSubcategory);
  $("#topics-empty").hidden = availableIds.length > 0;
  availableIds.forEach((topicId) => {
    const topic = topics[topicId];
    list.append(sectionButton(topic.title, topic.description, "", () => openTopic(topicId)));
  });
  showScreen("topics");
}

function openTopic(topicId, origin = "topics") {
  selectedTopic = topics[topicId];
  selectedSubcategory = selectedCategory.subcategories.find((group) => group.topicIds.includes(topicId));
  modeOrigin = origin;
  $("#back-from-modes").setAttribute("aria-label", origin === "topics" ? "Tillbaka till momenten" : `Tillbaka till ${origin === "home" ? "Hem" : "Bibliotek"}`);
  $("#mode-eyebrow").textContent = `${selectedCategory.title} · ${selectedSubcategory.title}`;
  $("#mode-introduction").textContent = selectedTopic.title;
  const grid = $("#mode-grid");
  grid.replaceChildren();
  const available = [...(selectedTopic.walkthrough?.length ? ["walkthrough"] : []), ...Object.keys(selectedTopic.modes).filter((mode) => modeQuestions(mode).length)];
  available.forEach((mode) => {
    const info = modeCatalog[mode];
    const button = document.createElement("button");
    button.className = "mode-button";
    button.innerHTML = `<span class="mode-icon">${info.icon}</span><span><strong>${info.name}</strong><small>${info.description}</small></span><b>›</b>`;
    button.addEventListener("click", () => startMode(mode));
    grid.append(button);
  });
  showScreen("mode");
}

function modeQuestions(mode) {
  return selectedTopic.modes[mode].filter((question) => question.levels.includes(level));
}

function startMode(mode) {
  currentMode = mode;
  questionIndex = 0;
  quickScore = 0;
  saveLastVisited();
  if (mode === "walkthrough") {
    walkthroughIndex = 0;
    renderWalkthrough();
    showScreen("walkthrough");
  } else {
    renderQuestion();
    showScreen("quiz");
  }
}

function renderQuestion() {
  const questions = modeQuestions(currentMode);
  const question = questions[questionIndex];
  $("#quiz-screen").classList.toggle("language-practice", Boolean(selectedTopic.languageFocused));
  $("#mode-label").textContent = currentMode === "quick" ? `Snabbträning · ${quickScore} rätt` : modeCatalog[currentMode].name;
  $("#question-progress").textContent = `Fråga ${questionIndex + 1} av ${questions.length}`;
  $("#question-heading").textContent = question.prompt;
  $("#question-example").textContent = question.example;
  $("#answer-instruction").textContent = "Välj ett svar.";
  $("#feedback").hidden = true;
  $("#explanation").hidden = true;
  $("#explanation-button").hidden = true;
  $("#next-question-button").hidden = true;
  const answers = $("#answers");
  answers.hidden = false;
  answers.replaceChildren();
  question.choices.forEach((choice, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.textContent = choice;
    button.addEventListener("click", () => handleAnswer(index === question.correct));
    answers.append(button);
  });
}

function handleAnswer(correct) {
  const question = modeQuestions(currentMode)[questionIndex];
  $("#answers").hidden = true;
  $("#feedback").hidden = false;
  $("#feedback-heading").textContent = correct ? "Rätt!" : "Inte riktigt";
  $("#feedback-message").textContent = correct ? "Bra jobbat – du valde rätt svar." : "Öppna förklaringen för att se hur du kan tänka.";
  $("#explanation-message").textContent = question.explanation;
  $("#explanation-button").hidden = correct;
  $("#next-question-button").hidden = !correct;
  if (currentMode === "quick" && correct) quickScore += 1;
  saveAttempt(correct);
}

function nextQuestion() {
  const questions = modeQuestions(currentMode);
  questionIndex = (questionIndex + 1) % questions.length;
  if (questionIndex === 0 && currentMode === "quick") quickScore = 0;
  renderQuestion();
}

function changeQuestion(direction) {
  const questions = modeQuestions(currentMode);
  const step = direction < 0 ? 1 : -1;
  questionIndex = (questionIndex + step + questions.length) % questions.length;
  if (questionIndex === 0 && currentMode === "quick") quickScore = 0;
  renderQuestion();
}

function renderWalkthrough() {
  $("#walkthrough-screen").classList.toggle("language-practice", Boolean(selectedTopic.languageFocused));
  const step = selectedTopic.walkthrough[walkthroughIndex];
  $("#walkthrough-progress").textContent = `Steg ${walkthroughIndex + 1} av ${selectedTopic.walkthrough.length}`;
  $("#walkthrough-heading").textContent = step[0];
  $("#walkthrough-example").textContent = step[1];
  $("#walkthrough-text").textContent = step[2];
  $("#extra-explanation").textContent = step[3];
  $("#extra-explanation").hidden = true;
  $("#more-explanation").hidden = false;
  $("#previous-step").disabled = walkthroughIndex === 0;
  $("#next-step").textContent = walkthroughIndex === selectedTopic.walkthrough.length - 1 ? "Klar" : "Nästa";
}

function progressData() {
  try { return JSON.parse(localStorage.getItem("mathclass-progress") || "{}"); } catch { return {}; }
}

function saveAttempt(correct) {
  const all = progressData();
  const data = all[level] || { attempts: 0, correct: 0, latest: "" };
  data.attempts += 1;
  if (correct) data.correct += 1;
  data.latest = selectedTopic.title;
  data.latestTopicId = Object.keys(topics).find((id) => topics[id] === selectedTopic);
  data.latestCategoryId = selectedCategory.id;
  all[level] = data;
  localStorage.setItem("mathclass-progress", JSON.stringify(all));
}

function saveLastVisited() {
  const all = progressData();
  const data = all[level] || { attempts: 0, correct: 0, latest: "" };
  data.latest = selectedTopic.title;
  data.latestTopicId = Object.keys(topics).find((id) => topics[id] === selectedTopic);
  data.latestCategoryId = selectedCategory.id;
  all[level] = data;
  localStorage.setItem("mathclass-progress", JSON.stringify(all));
}

function renderProgress() {
  const data = progressData()[level] || { attempts: 0, correct: 0, latest: "" };
  $("#progress-level").textContent = curriculum[level].name;
  $("#attempt-count").textContent = data.attempts;
  $("#correct-count").textContent = data.correct;
  $("#accuracy-count").textContent = `${data.attempts ? Math.round(data.correct / data.attempts * 100) : 0} %`;
  $("#latest-progress").textContent = data.latest ? `Senast tränade du på ${data.latest}.` : "När du börjar träna visas dina resultat här.";
}

function renderLibrary() {
  renderSearch("library");
  $("#library-level").textContent = curriculum[level].name;
  $("#level-select").value = level;
  const grid = $("#library-categories");
  grid.replaceChildren();
  curriculum[level].categories.forEach((category, index) => {
    const button = document.createElement("button");
    button.className = "category-button";
    const count = topicIdsFor(category).length;
    button.innerHTML = `<span>${index + 1}</span><strong>${category.title}</strong><small>${count ? `${category.subcategories.length} underkategorier · ${count} moment` : "Kommer senare"}</small>`;
    button.addEventListener("click", () => openCategory(category.id, "library"));
    grid.append(button);
  });
}

$("#level-select").addEventListener("change", (event) => {
  level = event.target.value;
  localStorage.setItem("mathclass-level", level);
  renderHome();
  renderLibrary();
});

function returnToSearch(origin) {
  showScreen(origin);
  renderSearch(origin);
  requestAnimationFrame(() => $(`#${origin}-search`).focus({ preventScroll: true }));
}

$("#back-from-subcategories").addEventListener("click", () => {
  if (topicsOrigin === "library") renderLibrary(); else renderHome();
  showScreen(topicsOrigin);
});
$("#back-from-topics").addEventListener("click", () => {
  if (subcategoryOrigin === "subcategories") openCategory(selectedCategory.id, topicsOrigin);
  else returnToSearch(subcategoryOrigin);
});
$("#back-from-modes").addEventListener("click", () => {
  if (modeOrigin === "topics") openSubcategory(selectedSubcategory.id, subcategoryOrigin);
  else returnToSearch(modeOrigin);
});
$("#back-from-quiz").addEventListener("click", () => showScreen("mode"));
$("#back-from-walkthrough").addEventListener("click", () => showScreen("mode"));
$("#explanation-button").addEventListener("click", () => { $("#explanation").hidden = false; $("#explanation-button").hidden = true; $("#next-question-button").hidden = false; });
$("#next-question-button").addEventListener("click", nextQuestion);
$("#previous-step").addEventListener("click", () => { walkthroughIndex = Math.max(0, walkthroughIndex - 1); renderWalkthrough(); });
$("#next-step").addEventListener("click", () => { if (walkthroughIndex === selectedTopic.walkthrough.length - 1) showScreen("mode"); else { walkthroughIndex += 1; renderWalkthrough(); } });
$("#more-explanation").addEventListener("click", () => { $("#extra-explanation").hidden = false; $("#more-explanation").hidden = true; });
$("#open-profile").addEventListener("click", () => { settingsOrigin = "home"; showScreen("settings"); });
$("#back-from-settings").addEventListener("click", () => showScreen(settingsOrigin));
$("#open-updates").addEventListener("click", () => showScreen("updates"));
$("#back-from-updates").addEventListener("click", () => showScreen("settings"));

navButtons.forEach((button) => button.addEventListener("click", () => {
  const target = button.dataset.nav;
  if (target === "home") renderHome();
  if (target === "progress") renderProgress();
  if (target === "library") renderLibrary();
  showScreen(target);
}));

function animatePageChange(direction) {
  if (swipeAnimating) return;
  swipeAnimating = true;
  const card = $("#quiz-screen .quiz-card");
  const exitY = direction < 0 ? "-110%" : "110%";
  const enterY = direction < 0 ? "110%" : "-110%";
  card.classList.remove("is-dragging");
  card.classList.add("is-snapping");
  card.style.transform = `translateY(${exitY})`;
  card.style.opacity = "0";
  window.setTimeout(() => {
    changeQuestion(direction);
    card.classList.remove("is-snapping");
    card.style.transform = `translateY(${enterY})`;
    card.style.opacity = "0";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      card.classList.add("is-snapping");
      card.style.transform = "translateY(0)";
      card.style.opacity = "1";
      window.setTimeout(() => {
        card.classList.remove("is-snapping");
        card.style.transform = "";
        card.style.opacity = "";
        swipeAnimating = false;
      }, 240);
    }));
  }, 230);
}

function snapPageBack() {
  const card = $("#quiz-screen .quiz-card");
  card.classList.remove("is-dragging");
  card.classList.add("is-snapping");
  card.style.transform = "translateY(0)";
  card.style.opacity = "1";
  window.setTimeout(() => {
    card.classList.remove("is-snapping");
    card.style.transform = "";
    card.style.opacity = "";
  }, 240);
}

document.addEventListener("touchstart", (event) => {
  if (activeScreen !== "quiz" || swipeAnimating) return;
  touchStartY = event.touches[0].clientY;
  touchCurrentY = touchStartY;
  touchStartedAt = performance.now();
  $("#quiz-screen .quiz-card").classList.add("is-dragging");
}, { passive: true });

document.addEventListener("touchmove", (event) => {
  if (activeScreen !== "quiz" || touchStartY === null || swipeAnimating) return;
  event.preventDefault();
  touchCurrentY = event.touches[0].clientY;
  const delta = Math.max(-180, Math.min(180, touchCurrentY - touchStartY));
  const card = $("#quiz-screen .quiz-card");
  card.style.transform = `translateY(${delta}px) scale(${1 - Math.abs(delta) / 5000})`;
  card.style.opacity = String(1 - Math.abs(delta) / 700);
}, { passive: false });

document.addEventListener("touchend", () => {
  if (activeScreen !== "quiz" || touchStartY === null || swipeAnimating) return;
  const delta = touchCurrentY - touchStartY;
  const elapsed = Math.max(1, performance.now() - touchStartedAt);
  const velocity = Math.abs(delta) / elapsed;
  touchStartY = null;
  touchCurrentY = null;
  if (Math.abs(delta) >= 95 || (Math.abs(delta) >= 45 && velocity > .55)) animatePageChange(Math.sign(delta));
  else snapPageBack();
}, { passive: true });
document.addEventListener("wheel", (event) => {
  if (activeScreen !== "quiz") return;
  event.preventDefault();
  if (wheelLocked || Math.abs(event.deltaY) < 20) return;
  wheelLocked = true;
  animatePageChange(-Math.sign(event.deltaY));
  setTimeout(() => { wheelLocked = false; }, 450);
}, { passive: false });


function normalizeSearch(text) {
  return text.toLocaleLowerCase("sv").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}

function searchSections(query) {
  const terms = normalizeSearch(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const entries = curriculum[level].categories.flatMap((category) => category.subcategories.flatMap((group) => {
    const path = `${category.title} → ${group.title}`;
    const topicEntries = topicIdsFor(group).map((topicId) => {
      const topic = topics[topicId];
      const questions = Object.values(topic.modes).flat().filter((question) => question.levels.includes(level));
      const vocabulary = questions.flatMap((question) => [question.prompt, question.example, question.choices[question.correct], question.explanation]);
      return { title: topic.title, description: path, category, group, topicId, ready: true,
        text: [path, topic.title, topic.description, ...(topic.walkthrough || []).flat(), ...vocabulary].join(" ") };
    });
    return [...topicEntries, { title: group.title, description: category.title, category, group, ready: topicEntries.length > 0,
      text: [category.title, group.title, group.description, group.keywords].join(" ") }];
  }));
  return entries.filter((entry) => terms.every((term) => normalizeSearch(entry.text).includes(term)))
    .sort((a, b) => Number(b.ready) - Number(a.ready) || Number(Boolean(b.topicId)) - Number(Boolean(a.topicId)) || a.title.localeCompare(b.title, "sv"));
}

function renderSearch(origin) {
  const input = $(`#${origin}-search`);
  const results = $(`#${origin}-search-results`);
  const status = $(`#${origin}-search-status`);
  $(`#${origin}-search-label`).textContent = `Sök avsnitt · ${curriculum[level].name}`;
  $(`#${origin}-search-clear`).hidden = !input.value;
  const query = input.value.trim();
  results.replaceChildren();
  results.hidden = !query;
  status.hidden = !query;
  if (!query) { status.textContent = ""; return; }
  const matches = searchSections(query);
  status.textContent = matches.length ? `${matches.length} ${matches.length === 1 ? "träff" : "träffar"}` : `Inga avsnitt hittades i ${curriculum[level].name.toLowerCase()}. Prova ett annat ord.`;
  matches.forEach((entry) => {
    const statusText = entry.topicId ? "Öppna träningslägen" : entry.ready ? "Visa moment" : "Kommer senare · inga övningar ännu";
    results.append(sectionButton(entry.title, entry.description, statusText, () => {
      selectedCategory = entry.category;
      topicsOrigin = origin;
      if (entry.topicId) openTopic(entry.topicId, origin);
      else openSubcategory(entry.group.id, origin);
    }));
  });
}

["home", "library"].forEach((origin) => {
  const input = $(`#${origin}-search`);
  input.addEventListener("input", () => renderSearch(origin));
  $(`#${origin}-search-clear`).addEventListener("click", () => {
    input.value = "";
    renderSearch(origin);
    input.focus();
  });
  $(`#${origin}-search-form`).addEventListener("submit", (event) => {
    event.preventDefault();
    renderSearch(origin);
    $(`#${origin}-search-results button`)?.focus();
  });
});

renderHome();
