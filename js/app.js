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
  animate: { name: "Animera", description: "Bygg uttryck steg för steg med Nästa", icon: "▷" },
  graphic: { name: "Grafisk", description: "Tolka figurer, lägen och samband", icon: "▧" },
  walkthrough: { name: "Genomgång", description: "Lär dig steg för steg", icon: "▶" },
  rules: { name: "Regler och begrepp", description: "Välj rätt regel eller begrepp", icon: "?" },
  calculate: { name: "Räkna ut", description: "Välj rätt svar", icon: "=" },
  missing: { name: "Saknat tal", description: "Fyll i det som saknas", icon: "□" },
  truefalse: { name: "Sant eller falskt", description: "Bedöm matematiska påståenden", icon: "✓" },
  quick: { name: "Snabbträning", description: "Flera frågor i följd", icon: "⏱" },
  order: { name: "Ordna", description: "Hitta rätt ordning", icon: "↕" },
  methods: { name: "Förstå metoden", description: "Välj och förklara ett arbetssätt", icon: "→" },
};

const q = (prompt, example, choices, correct, explanation, levels = ["high"], visual = null) => ({
  prompt, example, choices, correct, explanation, levels, visual,
});

const topics = {
  fractionFormsLanguage: {
  "title": "Bråk, decimal och procent",
  "description": "Beskriv samma andel på tre sätt och skilj exakta värden från avrundningar.",
  "levels": [
    "high"
  ],
  "languageFocused": true,
  "walkthrough": [
    [
      "Tre sätt att skriva samma andel",
      "1/4 = 0,25 = 25 %",
      "En fjärdedel, tjugofem hundradelar och tjugofem procent beskriver samma andel.",
      "Formen ändras, men värdet bevaras. Procent betyder hundradel.",
      {
        "type": "fraction",
        "rows": [
          {
            "parts": 4,
            "filled": 1,
            "label": "En av fyra lika delar"
          }
        ],
        "alt": "En helhet är indelad i fyra lika stora delar. En del är markerad."
      }
    ],
    [
      "Skriv som hundradelar",
      "3/5 = 60/100 = 60 %",
      "Förläng bråket så att nämnaren blir hundra. Då visar täljaren antalet procent.",
      "Multiplicera både täljare och nämnare med tjugo. Det räcker inte att bara ändra nämnaren."
    ],
    [
      "Exakt eller ungefär?",
      "1/3 ≈ 0,33 ≈ 33 %",
      "En tredjedel har oändligt många treor i decimalformen. När vi stannar vid två decimaler använder vi ungefär lika med.",
      "0,33 är exakt 33 %, men båda är lite mindre än en tredjedel. Tecknet ≈ markerar avrundningen."
    ]
  ],
  "modes": {
    "rules": [
      {
        "prompt": "Vad betyder procent?",
        "example": "25 %",
        "choices": [
          "Hundradelar",
          "Tiondelar",
          "Hela mängder"
        ],
        "correct": 0,
        "explanation": "Procent betyder hundradel. 25 % betyder 25 av 100.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad ändras mellan formerna?",
        "example": "1/2 = 0,5 = 50 %",
        "choices": [
          "Andelens värde",
          "Sättet att skriva andelen",
          "Storleken på det hela"
        ],
        "correct": 1,
        "explanation": "Alla tre formerna beskriver samma andel: hälften.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad betyder tecknet ≈?",
        "example": "1/3 ≈ 0,33",
        "choices": [
          "Exakt lika med",
          "Större än",
          "Ungefär lika med"
        ],
        "correct": 2,
        "explanation": "Decimalen är avrundad. En tredjedel är inte exakt 0,33.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilken decimalform är en hel?",
        "example": "100 %",
        "choices": [
          "1",
          "100",
          "0,01"
        ],
        "correct": 0,
        "explanation": "100 % är hundra hundradelar, alltså en hel: 1.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "methods": [
      {
        "prompt": "Vilket steg hjälper till procentform?",
        "example": "3/4",
        "choices": [
          "Ändra bara nämnaren till 100",
          "Förläng till 75/100",
          "Addera 100 till täljaren"
        ],
        "correct": 1,
        "explanation": "Multiplicera täljare och nämnare med 25. Då får du 75 hundradelar, alltså 75 %.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Hur tolkar du decimalen?",
        "example": "0,07",
        "choices": [
          "Sju tiondelar",
          "Sjuttio hundradelar",
          "Sju hundradelar"
        ],
        "correct": 2,
        "explanation": "Sju hundradelar skrivs 7/100 eller 7 %. Nollan efter kommat är viktig.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Hur skriver du bråket i decimalform?",
        "example": "3/8",
        "choices": [
          "Dividera 3 med 8",
          "Dividera 8 med 3",
          "Multiplicera 3 med 8"
        ],
        "correct": 0,
        "explanation": "Bråkstrecket betyder division. 3 ÷ 8 = 0,375.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Hur skriver du 40 % i decimalform?",
        "example": "40 av 100",
        "choices": [
          "40 × 100",
          "40 ÷ 100",
          "100 ÷ 40"
        ],
        "correct": 1,
        "explanation": "40 hundradelar är 0,40, vilket är samma tal som 0,4.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "truefalse": [
      {
        "prompt": "Sant eller falskt?",
        "example": "0,5 och 0,50 är samma tal",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "Fem tiondelar är lika mycket som femtio hundradelar.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "0,2 är samma andel som 2 %",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "0,2 är tjugo hundradelar och alltså 20 %. Två procent är 0,02.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "1/3 är exakt 33 %",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "33 % är 33/100. En tredjedel är lite större, så vi skriver ungefär 33 %.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "En andel kan skrivas som mer än 100 %",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "150 % är till exempel 1,5 gånger det hela. Procenttal behöver inte stanna vid hundra.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "graphic": [
      {
        "prompt": "Vilka former beskriver markeringen?",
        "example": "Samma andel på tre sätt",
        "choices": [
          "1/4 = 0,4 = 4 %",
          "1/4 = 0,25 = 25 %",
          "1/4 = 0,025 = 25 %"
        ],
        "correct": 1,
        "explanation": "En av fyra lika stora delar är en fjärdedel, alltså 0,25 eller 25 %.",
        "levels": [
          "high"
        ],
        "visual": {
          "type": "fraction",
          "rows": [
            {
              "parts": 4,
              "filled": 1,
              "label": "En av fyra lika delar"
            }
          ],
          "alt": "En helhet är indelad i fyra lika stora delar. En del är markerad."
        }
      },
      {
        "prompt": "Vilken procentform visar figuren?",
        "example": "Två av fem delar",
        "choices": [
          "20 %",
          "25 %",
          "40 %"
        ],
        "correct": 2,
        "explanation": "Varje femtedel motsvarar 20 %. Två femtedelar är 40 %.",
        "levels": [
          "high"
        ],
        "visual": {
          "type": "fraction",
          "rows": [
            {
              "parts": 5,
              "filled": 2,
              "label": "Två av fem lika delar"
            }
          ],
          "alt": "En helhet är indelad i fem lika stora delar. Två delar är markerade."
        }
      }
    ]
  },
  "animations": [
    {
      "id": "quarter",
      "title": "En fjärdedel i tre former",
      "levels": [
        "high"
      ],
      "compact": true,
      "steps": [
        {
          "parts": [
            {
              "id": "0",
              "text": "1/4"
            }
          ],
          "text": "Vi börjar med en fjärdedel. Det är en av fyra lika stora delar.",
          "spoken": "En fjärdedel."
        },
        {
          "parts": [
            {
              "id": "0",
              "text": "1/4"
            },
            {
              "id": "1",
              "text": "= 0,25"
            }
          ],
          "text": "Bråkstrecket betyder division. Ett delat med fyra är noll komma tjugofem.",
          "spoken": "En fjärdedel är lika med noll komma tjugofem."
        },
        {
          "parts": [
            {
              "id": "0",
              "text": "1/4"
            },
            {
              "id": "1",
              "text": "= 0,25"
            },
            {
              "id": "2",
              "text": "= 25 %"
            }
          ],
          "text": "Noll komma tjugofem är tjugofem hundradelar. Därför är det också tjugofem procent.",
          "spoken": "En fjärdedel är lika med noll komma tjugofem, som är lika med tjugofem procent."
        }
      ]
    },
    {
      "id": "hundredths",
      "title": "Från femtedelar till procent",
      "levels": [
        "high"
      ],
      "compact": true,
      "steps": [
        {
          "parts": [
            {
              "id": "0",
              "text": "3/5"
            }
          ],
          "text": "Vi vill skriva tre femtedelar i procentform. Procent betyder hundradel.",
          "spoken": "Tre femtedelar."
        },
        {
          "parts": [
            {
              "id": "0",
              "text": "3/5"
            },
            {
              "id": "1",
              "text": "= 60/100"
            }
          ],
          "text": "Multiplicera täljaren och nämnaren med tjugo. Tre femtedelar är sextio hundradelar.",
          "spoken": "Tre femtedelar är lika med sextio hundradelar."
        },
        {
          "parts": [
            {
              "id": "0",
              "text": "3/5"
            },
            {
              "id": "1",
              "text": "= 60/100"
            },
            {
              "id": "2",
              "text": "= 60 %"
            }
          ],
          "text": "Sextio hundradelar är sextio procent. Vi har ändrat skrivsättet men bevarat andelen.",
          "spoken": "Tre femtedelar är lika med sextio hundradelar, som är lika med sextio procent."
        }
      ]
    }
  ]
},
  fractionPartLanguage: {
  "title": "Bråk av en mängd",
  "description": "Skilj mellan andelen, delen och det hela. Förstå nämnarens och täljarens uppgifter.",
  "levels": [
    "high"
  ],
  "languageFocused": true,
  "walkthrough": [
    [
      "Hitta det hela",
      "2/3 av 24",
      "Det hela är 24. Bråket två tredjedelar beskriver andelen som vi vill ta av den mängden.",
      "Andelen är ett förhållande. Delen är mängden vi får, här 16."
    ],
    [
      "Hitta en lika stor del",
      "24 ÷ 3 = 8",
      "Nämnaren tre berättar hur många lika stora delar vi delar hela mängden i. En tredjedel är åtta.",
      "Vi delar mängden i tre grupper med lika många i varje grupp.",
      {
        "type": "fraction",
        "rows": [
          {
            "parts": 3,
            "filled": 2,
            "label": "Hela mängden: 24"
          }
        ],
        "alt": "En stapel visar hela mängden 24, uppdelad i tre lika stora delar. Två av delarna är markerade."
      }
    ],
    [
      "Ta rätt antal delar",
      "2 × 8 = 16",
      "Täljaren två berättar att vi ska ta två av tredjedelarna. Två grupper med åtta i varje blir sexton.",
      "Det går också att multiplicera 24 med två först och sedan dividera med tre. Båda sätten ger samma del."
    ]
  ],
  "modes": {
    "rules": [
      {
        "prompt": "Vilket tal är det hela?",
        "example": "2/3 av 24",
        "choices": [
          "24",
          "2",
          "3"
        ],
        "correct": 0,
        "explanation": "Det hela är mängden som andelen tas av. Här är det 24.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad beskriver bråket här?",
        "example": "2/3 av 24 = 16",
        "choices": [
          "Antalet i delen",
          "Andelen av det hela",
          "Hela mängden"
        ],
        "correct": 1,
        "explanation": "Två tredjedelar är andelen. 24 är det hela och 16 är delen.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad berättar nämnaren?",
        "example": "3/4 av en mängd",
        "choices": [
          "Hur många delar vi tar",
          "Hur många som blir över",
          "Hur många lika delar vi delar i"
        ],
        "correct": 2,
        "explanation": "Nämnaren fyra anger att det hela delas i fyra lika stora delar.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad berättar täljaren?",
        "example": "3/4 av en mängd",
        "choices": [
          "Hur många lika delar vi tar",
          "Hur stor hela mängden är",
          "Vilken enhet vi måste använda"
        ],
        "correct": 0,
        "explanation": "Täljaren tre anger att vi tar tre av de fyra lika stora delarna.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "methods": [
      {
        "prompt": "Vilket steg hittar en femtedel?",
        "example": "3/5 av 20",
        "choices": [
          "20 × 5",
          "20 ÷ 5",
          "20 ÷ 3"
        ],
        "correct": 1,
        "explanation": "Dela det hela med nämnaren fem. Då får du storleken av en femtedel.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad gör du efter divisionen?",
        "example": "3/5 av 20: en femtedel är 4",
        "choices": [
          "Dividera 4 med 3",
          "Addera 5 till 4",
          "Multiplicera 4 med 3"
        ],
        "correct": 2,
        "explanation": "Täljaren tre visar att vi ska ta tre femtedelar. Varje femtedel är fyra.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilket uttryck beskriver metoden?",
        "example": "2/3 av 24",
        "choices": [
          "(24 ÷ 3) × 2",
          "(24 ÷ 2) × 3",
          "24 ÷ (3 × 2)"
        ],
        "correct": 0,
        "explanation": "Dividera med nämnaren för en del och multiplicera med täljaren för rätt antal delar.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilken kontroll är rimlig?",
        "example": "3/4 av 20",
        "choices": [
          "Svaret ska vara större än 20",
          "Svaret ska ligga mellan 10 och 20",
          "Svaret måste vara mindre än 10"
        ],
        "correct": 1,
        "explanation": "Tre fjärdedelar är mer än hälften men mindre än en hel. Delen ska därför vara större än 10 men mindre än 20.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "truefalse": [
      {
        "prompt": "Sant eller falskt?",
        "example": "Hälften av 10 och hälften av 20 är samma mängd",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "Andelen är samma, men delarna är 5 respektive 10 eftersom hela mängden skiljer sig.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "2/3 av 24 kan beräknas som (24 × 2) ÷ 3",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "Multiplikation med två och division med tre ger samma resultat i den här ordningen.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "1/4 av 20 fås genom att dividera 20 med 4",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "Täljaren är ett, så vi tar en av de fyra lika stora delarna.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "Täljaren anger alltid antalet föremål i svaret",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "Täljaren anger antalet lika stora delar vi tar. Varje del kan innehålla flera föremål.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "graphic": [
      {
        "prompt": "Vilket steg ger en av de tre delarna?",
        "example": "Två delar är markerade",
        "choices": [
          "24 × 3",
          "24 ÷ 2",
          "24 ÷ 3"
        ],
        "correct": 2,
        "explanation": "Hela mängden 24 delas i tre lika stora delar. Varje del innehåller åtta.",
        "levels": [
          "high"
        ],
        "visual": {
          "type": "fraction",
          "rows": [
            {
              "parts": 3,
              "filled": 2,
              "label": "Hela mängden: 24"
            }
          ],
          "alt": "En stapel visar hela mängden 24, uppdelad i tre lika stora delar. Två av delarna är markerade."
        }
      },
      {
        "prompt": "Vilket uttryck ger den markerade mängden?",
        "example": "Tre av fyra delar",
        "choices": [
          "(20 ÷ 4) × 3",
          "(20 ÷ 3) × 4",
          "20 ÷ 4"
        ],
        "correct": 0,
        "explanation": "Dela 20 i fyra lika stora delar och ta tre av dem.",
        "levels": [
          "high"
        ],
        "visual": {
          "type": "fraction",
          "rows": [
            {
              "parts": 4,
              "filled": 3,
              "label": "Hela mängden: 20"
            }
          ],
          "alt": "En stapel visar hela mängden 20, uppdelad i fyra lika stora delar. Tre av delarna är markerade."
        }
      }
    ]
  },
  "animations": [
    {
      "id": "two-thirds",
      "title": "Två tredjedelar av en mängd",
      "levels": [
        "high"
      ],
      "compact": true,
      "steps": [
        {
          "parts": [
            {
              "id": "expression",
              "text": "2/3 av 24"
            }
          ],
          "text": "Vi börjar med hela mängden 24 och vill ta två tredjedelar av den.",
          "spoken": "Två tredjedelar av tjugofyra."
        },
        {
          "parts": [
            {
              "id": "expression",
              "text": "24 ÷ 3 = 8"
            }
          ],
          "text": "Vi delar med nämnaren tre. Nu vet vi att en tredjedel av mängden är åtta.",
          "spoken": "Tjugofyra delat med tre är lika med åtta."
        },
        {
          "parts": [
            {
              "id": "expression",
              "text": "2 × 8 = 16"
            }
          ],
          "text": "Vi tar två sådana delar, eftersom täljaren är två. Delen blir sexton.",
          "spoken": "Två gånger åtta är lika med sexton."
        }
      ]
    },
    {
      "id": "three-quarters",
      "title": "Tre fjärdedelar av en längd",
      "levels": [
        "high"
      ],
      "compact": true,
      "steps": [
        {
          "parts": [
            {
              "id": "expression",
              "text": "3/4 av 20 m"
            }
          ],
          "text": "Ett band är tjugo meter långt. Vi vill veta längden av tre fjärdedelar av bandet.",
          "spoken": "Tre fjärdedelar av tjugo meter."
        },
        {
          "parts": [
            {
              "id": "expression",
              "text": "20 m ÷ 4 = 5 m"
            }
          ],
          "text": "Vi delar hela längden i fyra lika långa delar. Varje fjärdedel är fem meter.",
          "spoken": "Tjugo meter delat med fyra är lika med fem meter."
        },
        {
          "parts": [
            {
              "id": "expression",
              "text": "3 × 5 m = 15 m"
            }
          ],
          "text": "Vi tar tre av delarna. Tre fjärdedelar av bandet är femton meter, och längden anges fortfarande i meter.",
          "spoken": "Tre gånger fem meter är lika med femton meter."
        }
      ]
    }
  ]
},
  fractionMethodLanguage: {
  "title": "Bråk med gemensam nämnare",
  "description": "Förläng, förkorta och förstå addition och subtraktion av bråk.",
  "levels": [
    "high"
  ],
  "languageFocused": true,
  "walkthrough": [
    [
      "Samma värde, nya delar",
      "1/2 = 2/4",
      "En halv och två fjärdedelar är lika mycket av samma helhet. Fler delar behöver alltså inte betyda ett större värde.",
      "När varje halva delas i två blir delarna hälften så stora men dubbelt så många.",
      {
        "type": "fraction",
        "rows": [
          {
            "parts": 2,
            "filled": 1,
            "label": "A"
          },
          {
            "parts": 4,
            "filled": 2,
            "label": "B"
          }
        ],
        "alt": "Två lika stora helheter. A har en av två lika stora delar markerad. B har två av fyra lika stora delar markerade."
      }
    ],
    [
      "Gör delarna jämförbara",
      "1/2 + 1/4 = 2/4 + 1/4",
      "Förläng en halv med två. Nu beskriver båda bråken fjärdedelar, så delarna är av samma storlek.",
      "Multiplicera både täljare och nämnare med två. Bråkets värde ändras inte."
    ],
    [
      "Räkna delarna",
      "2/4 + 1/4 = 3/4",
      "Två fjärdedelar plus en fjärdedel blir tre fjärdedelar. Addera täljarna och behåll nämnaren.",
      "Vid subtraktion fungerar det likadant: 3/4 − 1/4 = 2/4. Nämnaren beskriver fortfarande fjärdedelar."
    ]
  ],
  "modes": {
    "rules": [
      {
        "prompt": "Vad bevaras vid förlängning?",
        "example": "1/2 = 2/4",
        "choices": [
          "Bråkets värde",
          "Antalet delar",
          "Nämnaren"
        ],
        "correct": 0,
        "explanation": "Täljare och nämnare multipliceras med samma tal, skilt från noll. Därför bevaras värdet.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad betyder gemensam nämnare?",
        "example": "2/6 och 3/6",
        "choices": [
          "Samma täljare",
          "Samma nämnare",
          "Samma värde"
        ],
        "correct": 1,
        "explanation": "Båda bråken beskriver sjättedelar. Täljarna kan vara olika.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Varför behåller vi nämnaren?",
        "example": "1/5 + 2/5 = 3/5",
        "choices": [
          "Delarna blir större",
          "Nämnaren saknar betydelse",
          "Vi räknar fortfarande femtedelar"
        ],
        "correct": 2,
        "explanation": "Vi lägger ihop antalet femtedelar. Delarnas storlek ändras inte.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad innebär enklaste form?",
        "example": "6/8 = 3/4",
        "choices": [
          "Ingen gemensam heltalsfaktor över 1",
          "Täljaren måste vara 1",
          "Nämnaren måste vara jämn"
        ],
        "correct": 0,
        "explanation": "I 3/4 har täljare och nämnare ingen gemensam heltalsfaktor större än ett.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "methods": [
      {
        "prompt": "Vilket första steg passar?",
        "example": "1/2 + 1/3",
        "choices": [
          "Addera nämnarna",
          "Skriv båda med nämnaren 6",
          "Ta bort bråkstrecken"
        ],
        "correct": 1,
        "explanation": "Förläng till 3/6 och 2/6. Sedan går sjättedelarna att addera.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Hur förkortar du detta bråk?",
        "example": "6/8",
        "choices": [
          "Subtrahera 2 från båda",
          "Dividera bara täljaren med 2",
          "Dividera båda med 2"
        ],
        "correct": 2,
        "explanation": "6 ÷ 2 = 3 och 8 ÷ 2 = 4. Därför är 6/8 = 3/4.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Hur subtraherar du här?",
        "example": "5/6 − 2/6",
        "choices": [
          "Subtrahera täljarna, behåll 6",
          "Subtrahera nämnarna också",
          "Multiplicera täljarna"
        ],
        "correct": 0,
        "explanation": "Fem sjättedelar minus två sjättedelar är tre sjättedelar.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Hur jämför du bråken?",
        "example": "2/3 och 3/4",
        "choices": [
          "Störst nämnare vinner alltid",
          "Skriv som 8/12 och 9/12",
          "Jämför bara täljarna"
        ],
        "correct": 1,
        "explanation": "Med samma nämnare är delarna lika stora. Nio tolftedelar är mer än åtta tolftedelar.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "truefalse": [
      {
        "prompt": "Sant eller falskt?",
        "example": "Att förlänga ett bråk gör alltid värdet större",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "Förlängning ändrar skrivsättet men bevarar värdet.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "1/3 + 1/3 = 2/6",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "En tredjedel plus en tredjedel är två tredjedelar: 2/3.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "12 kan vara gemensam nämnare till 1/2 och 1/3",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "1/2 = 6/12 och 1/3 = 4/12. En gemensam nämnare behöver inte vara den minsta.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "4/6 och 2/3 har samma värde",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "Dividera både täljare och nämnare i 4/6 med två för att få 2/3.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "graphic": [
      {
        "prompt": "Vad visar de markerade delarna?",
        "example": "Lika stora helheter",
        "choices": [
          "A är större",
          "B är större",
          "Lika stora andelar"
        ],
        "correct": 2,
        "explanation": "En halv och två fjärdedelar täcker lika mycket av lika stora helheter.",
        "levels": [
          "high"
        ],
        "visual": {
          "type": "fraction",
          "rows": [
            {
              "parts": 2,
              "filled": 1,
              "label": "A"
            },
            {
              "parts": 4,
              "filled": 2,
              "label": "B"
            }
          ],
          "alt": "Två lika stora helheter. A har en av två lika stora delar markerad. B har två av fyra lika stora delar markerade."
        }
      },
      {
        "prompt": "Vad har ändrats från A till B?",
        "example": "Från halvor till fjärdedelar",
        "choices": [
          "Fler, mindre delar",
          "Större markerad andel",
          "Större helhet"
        ],
        "correct": 0,
        "explanation": "Varje halva har delats i två fjärdedelar. Andelen är oförändrad.",
        "levels": [
          "high"
        ],
        "visual": {
          "type": "fraction",
          "rows": [
            {
              "parts": 2,
              "filled": 1,
              "label": "A"
            },
            {
              "parts": 4,
              "filled": 2,
              "label": "B"
            }
          ],
          "alt": "Två lika stora helheter. A har en av två lika stora delar markerad. B har två av fyra lika stora delar markerade."
        }
      }
    ]
  },
  "animations": [
    {
      "id": "extend-add",
      "title": "Från halvor till fjärdedelar",
      "levels": [
        "high"
      ],
      "compact": true,
      "steps": [
        {
          "parts": [
            {
              "id": "expression",
              "text": "1/2 + 1/4"
            }
          ],
          "text": "Vi vill addera en halv och en fjärdedel. Först behöver vi beskriva delarna med samma nämnare.",
          "spoken": "En halv plus en fjärdedel."
        },
        {
          "parts": [
            {
              "id": "expression",
              "text": "(1 × 2)/(2 × 2) + 1/4"
            }
          ],
          "text": "Vi multiplicerar både täljare och nämnare i en halv med två. Värdet bevaras.",
          "spoken": "Ett gånger två delat med två gånger två, plus en fjärdedel."
        },
        {
          "parts": [
            {
              "id": "expression",
              "text": "2/4 + 1/4"
            }
          ],
          "text": "En halv har skrivits som två fjärdedelar. Nu räknar båda bråken fjärdedelar.",
          "spoken": "Två fjärdedelar plus en fjärdedel."
        },
        {
          "parts": [
            {
              "id": "expression",
              "text": "2/4 + 1/4 = 3/4"
            }
          ],
          "text": "Två delar plus en del blir tre delar. Nämnaren fyra är kvar eftersom delarna fortfarande är fjärdedelar.",
          "spoken": "Två fjärdedelar plus en fjärdedel är lika med tre fjärdedelar."
        }
      ]
    },
    {
      "id": "reduce",
      "title": "Förkorta utan att ändra värdet",
      "levels": [
        "high"
      ],
      "compact": true,
      "steps": [
        {
          "parts": [
            {
              "id": "expression",
              "text": "6/8"
            }
          ],
          "text": "Vi börjar med sex åttondelar. Både sex och åtta är delbara med två.",
          "spoken": "Sex åttondelar."
        },
        {
          "parts": [
            {
              "id": "expression",
              "text": "(6 ÷ 2)/(8 ÷ 2)"
            }
          ],
          "text": "Vi dividerar både täljare och nämnare med två. Det motsvarar att samla åttondelarna två och två.",
          "spoken": "Sex delat med två, dividerat med åtta delat med två."
        },
        {
          "parts": [
            {
              "id": "expression",
              "text": "6/8 = 3/4"
            }
          ],
          "text": "Sex åttondelar är tre fjärdedelar. Tre och fyra saknar gemensam heltalsfaktor över ett, så bråket är i enklaste form.",
          "spoken": "Sex åttondelar är lika med tre fjärdedelar."
        }
      ]
    }
  ]
},
  proportionLanguage: {
  "title": "Proportionella samband",
  "description": "Förstå samma förhållande, fast styckepris och origo.",
  "levels": [
    "high"
  ],
  "languageFocused": true,
  "walkthrough": [
    [
      "Samma förhållande",
      "y = 15x",
      "Om varje vara kostar 15 kronor utan extra avgift är totalkostnaden proportionell mot antalet varor.",
      "x är antalet varor och y kostnaden i kronor. För x större än noll är kvoten y ÷ x alltid 15."
    ],
    [
      "Dubbla båda",
      "2 varor → 30 kr\n4 varor → 60 kr",
      "När antalet varor dubblas dubblas också kostnaden, eftersom styckepriset är oförändrat.",
      "Det är förhållandet som är konstant. Det betyder inte att antalet varor och kostnaden ökar med samma antal."
    ],
    [
      "Börja i origo",
      "x = 0 → y = 0",
      "Grafen för y = kx är en rät linje genom origo. Utan varor blir kostnaden noll när det inte finns någon fast avgift.",
      "En rät linje som inte går genom origo visar inte ett proportionellt samband.",
      {
        "type": "functionGraph",
        "lines": [
          {
            "k": 2,
            "m": 0,
            "label": ""
          }
        ],
        "alt": "Koordinatsystem: x från 0 till 4 i steg om 1, y från 0 till 8 i steg om 2. Linjen går genom (0, 0), (1, 2), (2, 4) och (4, 8)."
      }
    ]
  ],
  "modes": {
    "rules": [
      {
        "prompt": "Vad kännetecknar proportionalitet?",
        "example": "y = kx",
        "choices": [
          "Samma faktor mellan x och y",
          "Samma tal adderas alltid till x",
          "y måste alltid vara större än x"
        ],
        "correct": 0,
        "explanation": "y fås genom att multiplicera x med en konstant faktor k.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad händer när mängden dubblas?",
        "example": "Fast styckepris, ingen extra avgift",
        "choices": [
          "Kostnaden är oförändrad",
          "Kostnaden dubblas",
          "Kostnaden ökar med två kronor"
        ],
        "correct": 1,
        "explanation": "Samma styckepris gör att dubbelt så många varor kostar dubbelt så mycket.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilken punkt passerar grafen?",
        "example": "Ett proportionellt samband",
        "choices": [
          "(1, 1) alltid",
          "(0, 1) alltid",
          "Origo"
        ],
        "correct": 2,
        "explanation": "När x = 0 ger y = kx också y = 0.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad står 15 för?",
        "example": "y = 15x, x varor och y kronor",
        "choices": [
          "Priset per vara",
          "En extra startavgift",
          "Antalet varor"
        ],
        "correct": 0,
        "explanation": "Faktorn 15 anger hur många kronor varje vara kostar.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "methods": [
      {
        "prompt": "Hur undersöker du en värdetabell?",
        "example": "Alla x-värden är positiva",
        "choices": [
          "Addera alla y-värden",
          "Jämför kvoterna y ÷ x",
          "Jämför bara största talen"
        ],
        "correct": 1,
        "explanation": "Samma kvot i tabellens par är förenligt med proportionalitet. Hela sambandet måste följa samma regel.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad kontrollerar du i en rak graf?",
        "example": "Är sambandet proportionellt?",
        "choices": [
          "Om linjen är blå",
          "Om linjen går uppåt",
          "Om linjen går genom origo"
        ],
        "correct": 2,
        "explanation": "En rät linje genom origo har formen y = kx.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Hur skriver du sambandet?",
        "example": "Varje biljett kostar 20 kr, utan extra avgift",
        "choices": [
          "y = 20x",
          "y = x + 20",
          "y = 20 − x"
        ],
        "correct": 0,
        "explanation": "Totalkostnaden är priset per biljett gånger antalet biljetter.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Hur påverkar en fast extra avgift sambandet?",
        "example": "y = 15x + 10",
        "choices": [
          "Det är fortfarande proportionellt",
          "Det är inte proportionellt",
          "Kostnaden är alltid tio kronor"
        ],
        "correct": 1,
        "explanation": "Startvärdet är 10. Grafen går därför inte genom origo.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "truefalse": [
      {
        "prompt": "Sant eller falskt?",
        "example": "Alla räta linjer visar proportionalitet",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "Linjen måste också gå genom origo.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "En halverad mängd ger halverad kostnad vid fast styckepris utan extra avgift",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "Båda storheterna ändras med samma faktor.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "Om y = 3x är y ÷ x lika med 3 när x inte är noll",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "Kvoten mellan y och x är konstant.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "Proportionell betyder att båda storheterna alltid ökar med samma antal",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "De ändras med samma faktor. Antalet varor och kostnaden kan öka med olika antal.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "graphic": [
      {
        "prompt": "Vilken linje visar proportionalitet?",
        "example": "Två räta linjer",
        "choices": [
          "A",
          "B",
          "Båda"
        ],
        "correct": 0,
        "explanation": "A är en rät linje genom origo. B har startvärdet 2.",
        "levels": [
          "high"
        ],
        "visual": {
          "type": "functionGraph",
          "lines": [
            {
              "k": 2,
              "m": 0,
              "label": "A"
            },
            {
              "k": 1,
              "m": 2,
              "label": "B"
            }
          ],
          "alt": "Koordinatsystem: x från 0 till 4 i steg om 1, y från 0 till 8 i steg om 2. Linje A går genom (0, 0), (2, 4), (4, 8). Linje B går genom (0, 2), (2, 4), (4, 6)."
        }
      },
      {
        "prompt": "Vad händer från x = 1 till x = 2?",
        "example": "Läs y-värdena",
        "choices": [
          "y är oförändrat",
          "y dubblas",
          "y halveras"
        ],
        "correct": 1,
        "explanation": "y går från 2 till 4 när x går från 1 till 2.",
        "levels": [
          "high"
        ],
        "visual": {
          "type": "functionGraph",
          "lines": [
            {
              "k": 2,
              "m": 0,
              "label": ""
            }
          ],
          "alt": "Koordinatsystem: x från 0 till 4 i steg om 1, y från 0 till 8 i steg om 2. Linjen går genom (0, 0), (1, 2), (2, 4) och (4, 8)."
        }
      },
      {
        "prompt": "Är sambandet proportionellt?",
        "example": "Undersök startvärdet",
        "choices": [
          "Ja, för linjen är rak",
          "Ja, för linjen stiger",
          "Nej, linjen går inte genom origo"
        ],
        "correct": 2,
        "explanation": "När x = 0 är y = 2. Sambandet är därför inte proportionellt.",
        "levels": [
          "high"
        ],
        "visual": {
          "type": "functionGraph",
          "lines": [
            {
              "k": 1,
              "m": 2,
              "label": ""
            }
          ],
          "alt": "Koordinatsystem: x från 0 till 4 i steg om 1, y från 0 till 8 i steg om 2. Linjen går genom (0, 2), (2, 4) och (4, 6)."
        }
      },
      {
        "prompt": "Vilken linje har störst positiv lutning?",
        "example": "Samma axlar och skalor",
        "choices": [
          "B",
          "A",
          "De har samma lutning"
        ],
        "correct": 0,
        "explanation": "B:s y-värde ökar med två per x-steg. A:s ökar med ett.",
        "levels": [
          "high"
        ],
        "visual": {
          "type": "functionGraph",
          "lines": [
            {
              "k": 1,
              "m": 0,
              "label": "A"
            },
            {
              "k": 2,
              "m": 0,
              "label": "B"
            }
          ],
          "alt": "Koordinatsystem: x från 0 till 4 i steg om 1, y från 0 till 8 i steg om 2. Linje A går genom (0, 0) och (4, 4). Linje B går genom (0, 0) och (4, 8)."
        }
      }
    ]
  },
  "animations": [
    {
      "id": "unit-price",
      "title": "Från styckepris till kostnad",
      "levels": [
        "high"
      ],
      "compact": true,
      "steps": [
        {
          "parts": [
            {
              "id": "y",
              "text": "y ="
            },
            {
              "id": "rule",
              "text": "15x"
            }
          ],
          "text": "Varje vara kostar femton kronor utan extra avgift. x är antalet varor och y är kostnaden.",
          "spoken": "y är lika med femton x."
        },
        {
          "parts": [
            {
              "id": "y",
              "text": "y ="
            },
            {
              "id": "rule",
              "text": "15 × 2"
            }
          ],
          "text": "Vi köper två varor och ersätter x med två. Styckepriset är oförändrat.",
          "spoken": "y är lika med femton gånger två."
        },
        {
          "parts": [
            {
              "id": "y",
              "text": "y ="
            },
            {
              "id": "rule",
              "text": "30"
            }
          ],
          "text": "Totalkostnaden är trettio kronor. Vi har använt samma faktor för varje vara.",
          "spoken": "y är lika med trettio."
        }
      ]
    },
    {
      "id": "double",
      "title": "Dubbla mängden",
      "levels": [
        "high"
      ],
      "compact": true,
      "steps": [
        {
          "parts": [
            {
              "id": "x",
              "text": "x = 2"
            },
            {
              "id": "arrow",
              "text": "→"
            },
            {
              "id": "y",
              "text": "y = 30"
            }
          ],
          "text": "Två varor kostar trettio kronor. Varje vara kostar femton kronor och ingen extra avgift tillkommer.",
          "spoken": "x är två och y är trettio."
        },
        {
          "parts": [
            {
              "id": "x",
              "text": "x = 4"
            },
            {
              "id": "arrow",
              "text": "→"
            },
            {
              "id": "y",
              "text": "y = ?"
            }
          ],
          "text": "Vi dubblar antalet varor från två till fyra. Då måste även kostnaden dubblas.",
          "spoken": "x är fyra. Vilket y-värde hör till?"
        },
        {
          "parts": [
            {
              "id": "x",
              "text": "x = 4"
            },
            {
              "id": "arrow",
              "text": "→"
            },
            {
              "id": "y",
              "text": "y = 60"
            }
          ],
          "text": "Fyra varor kostar sextio kronor. Både mängden och kostnaden har multiplicerats med två.",
          "spoken": "x är fyra och y är sextio."
        }
      ]
    }
  ]
},
  linearLanguage: {
  "title": "Räta linjens språk",
  "description": "Tolka lutning, startvärde och formeln y = kx + m.",
  "levels": [
    "high"
  ],
  "languageFocused": true,
  "walkthrough": [
    [
      "Två delar i sambandet",
      "y = 2x + 3",
      "I den här formeln anger 2 hur mycket y ökar när x ökar med ett. Talet 3 anger y-värdet när x är noll.",
      "Formen är y = kx + m. k är lutningen och m är startvärdet, där linjen skär y-axeln."
    ],
    [
      "Lutningen beskriver förändring",
      "x ökar med 1 → y ökar med 2",
      "För y = 2x + 3 innebär ett steg åt höger att y ökar med två. Lutningen är konstant.",
      "Ett negativt k betyder att y minskar när x ökar. När k = 0 är y konstant."
    ],
    [
      "Startvärdet läses vid noll",
      "y = 2x + 3",
      "När x är noll försvinner termen 2x. Då återstår startvärdet 3, där linjen möter y-axeln.",
      "Startvärdet kan vara positivt, negativt eller noll. När m = 0 får vi ett proportionellt samband.",
      {
        "type": "functionGraph",
        "lines": [
          {
            "k": 2,
            "m": 3,
            "label": ""
          }
        ],
        "alt": "Koordinatsystem: x från 0 till 4 i steg om 1, y från 0 till 8 i steg om 2. Linjen går genom (0, 3), (1, 5) och (2, 7), och når bildens överkant vid (2,5; 8)."
      }
    ]
  ],
  "modes": {
    "rules": [
      {
        "prompt": "Vad beskriver k?",
        "example": "y = kx + m",
        "choices": [
          "Lutningen",
          "Punktens namn",
          "Startvärdet"
        ],
        "correct": 0,
        "explanation": "k anger förändringen i y när x ökar med ett.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad beskriver m?",
        "example": "y = kx + m",
        "choices": [
          "Antalet punkter",
          "y-värdet när x = 0",
          "Det största x-värdet"
        ],
        "correct": 1,
        "explanation": "m är startvärdet och linjens skärning med y-axeln.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad betyder negativ lutning?",
        "example": "k < 0",
        "choices": [
          "y är alltid negativt",
          "x måste minska",
          "y minskar när x ökar"
        ],
        "correct": 2,
        "explanation": "Negativt k beskriver riktningen på förändringen, inte tecknet på alla y-värden.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad betyder k = 0?",
        "example": "y = 0x + 3",
        "choices": [
          "y är konstant",
          "y är alltid noll",
          "Grafen är lodrät"
        ],
        "correct": 0,
        "explanation": "y = 3 för alla x. Grafen är en vågrät linje.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "methods": [
      {
        "prompt": "Hur hittar du startvärdet i formeln?",
        "example": "y = 2x + 3",
        "choices": [
          "Sätt y till noll",
          "Sätt x till noll",
          "Multiplicera alla tal"
        ],
        "correct": 1,
        "explanation": "När x = 0 blir y = 3, så m = 3.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Hur bestämmer du lutningen mellan två punkter?",
        "example": "Samma räta linje, olika x-värden",
        "choices": [
          "Addera koordinaterna",
          "Dela ändringen i x med ändringen i y",
          "Dela ändringen i y med ändringen i x"
        ],
        "correct": 2,
        "explanation": "Lutningen är förändringen i y per enhet x.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilken formel beskriver avgiften?",
        "example": "Startavgift 3 kr och 2 kr per minut",
        "choices": [
          "y = 2x + 3",
          "y = 3x + 2",
          "y = 5x"
        ],
        "correct": 0,
        "explanation": "2x är den rörliga delen och 3 är den fasta delen.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad gäller för två olika parallella linjer?",
        "example": "Formen y = kx + m",
        "choices": [
          "Samma m, olika k",
          "Samma k, olika m",
          "Både k och m är samma"
        ],
        "correct": 1,
        "explanation": "De har samma lutning men olika startvärden. Samma k och m skulle ge samma linje.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "truefalse": [
      {
        "prompt": "Sant eller falskt?",
        "example": "En linje med negativt k måste ligga under x-axeln",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "Den sjunker när x ökar, men kan ha både positiva och negativa y-värden.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "m = 0 innebär att grafen går genom origo",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "När x = 0 är y = m, alltså noll.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "En värdetabell visar par av x- och y-värden",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "Varje par beskriver en punkt som hör till sambandet.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "Startvärdet måste vara positivt",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "m kan vara positivt, negativt eller noll.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "graphic": [
      {
        "prompt": "Vilket är startvärdet?",
        "example": "Läs där linjen möter y-axeln",
        "choices": [
          "2",
          "4",
          "0"
        ],
        "correct": 0,
        "explanation": "Vid x = 0 är y = 2. Startvärdet m är alltså 2.",
        "levels": [
          "high"
        ],
        "visual": {
          "type": "functionGraph",
          "lines": [
            {
              "k": 1,
              "m": 2,
              "label": ""
            }
          ],
          "alt": "Koordinatsystem: x från 0 till 4 i steg om 1, y från 0 till 8 i steg om 2. Linjen går genom (0, 2), (2, 4) och (4, 6)."
        }
      },
      {
        "prompt": "Hur mycket ökar y per x-steg?",
        "example": "Läs skalan, inte bara rutorna",
        "choices": [
          "2",
          "1",
          "4"
        ],
        "correct": 1,
        "explanation": "Från x = 0 till x = 2 ökar y från 2 till 4. Lutningen är 2 ÷ 2 = 1.",
        "levels": [
          "high"
        ],
        "visual": {
          "type": "functionGraph",
          "lines": [
            {
              "k": 1,
              "m": 2,
              "label": ""
            }
          ],
          "alt": "Koordinatsystem: x från 0 till 4 i steg om 1, y från 0 till 8 i steg om 2. Linjen går genom (0, 2), (2, 4) och (4, 6)."
        }
      },
      {
        "prompt": "Vad visar linjens riktning?",
        "example": "Följ linjen åt höger",
        "choices": [
          "Positiv lutning",
          "Lutningen är noll",
          "Negativ lutning"
        ],
        "correct": 2,
        "explanation": "y minskar när x ökar, så k är negativt.",
        "levels": [
          "high"
        ],
        "visual": {
          "type": "functionGraph",
          "lines": [
            {
              "k": -1,
              "m": 6,
              "label": ""
            }
          ],
          "alt": "Koordinatsystem: x från 0 till 4 i steg om 1, y från 0 till 8 i steg om 2. Linjen går genom (0, 6), (2, 4) och (4, 2)."
        }
      },
      {
        "prompt": "Varför är linjerna parallella?",
        "example": "Jämför förändring och startvärde",
        "choices": [
          "Samma lutning, olika startvärden",
          "Samma startvärde, olika lutningar",
          "Båda går genom origo"
        ],
        "correct": 0,
        "explanation": "Båda ökar lika mycket per x-steg men börjar på olika y-värden.",
        "levels": [
          "high"
        ],
        "visual": {
          "type": "functionGraph",
          "lines": [
            {
              "k": 1,
              "m": 0,
              "label": "A"
            },
            {
              "k": 1,
              "m": 2,
              "label": "B"
            }
          ],
          "alt": "Koordinatsystem: x från 0 till 4 i steg om 1, y från 0 till 8 i steg om 2. Linje A går genom (0, 0) och (4, 4). Linje B går genom (0, 2) och (4, 6)."
        }
      }
    ]
  },
  "animations": [
    {
      "id": "fixed-part",
      "title": "Lägg till en startavgift",
      "levels": [
        "high"
      ],
      "compact": true,
      "steps": [
        {
          "parts": [
            {
              "id": "y",
              "text": "y ="
            },
            {
              "id": "variable",
              "text": "2x"
            }
          ],
          "text": "Den rörliga kostnaden är två kronor per minut. x anger antalet minuter.",
          "spoken": "y är lika med två x."
        },
        {
          "parts": [
            {
              "id": "y",
              "text": "y ="
            },
            {
              "id": "variable",
              "text": "2x"
            },
            {
              "id": "fixed",
              "text": "+ 3"
            }
          ],
          "text": "En startavgift på tre kronor tillkommer. Den delen är fast, oavsett antalet minuter.",
          "spoken": "y är lika med två x plus tre."
        },
        {
          "parts": [
            {
              "id": "y",
              "text": "y ="
            },
            {
              "id": "variable",
              "text": "2 × 4"
            },
            {
              "id": "fixed",
              "text": "+ 3"
            }
          ],
          "text": "Efter fyra minuter ersätter vi x med fyra. Startavgiften läggs till en enda gång.",
          "spoken": "y är lika med två gånger fyra plus tre."
        },
        {
          "parts": [
            {
              "id": "y",
              "text": "y ="
            },
            {
              "id": "result",
              "text": "11"
            }
          ],
          "text": "Totalkostnaden blir elva kronor: åtta kronor för tiden och tre kronor i startavgift.",
          "spoken": "y är lika med elva."
        }
      ]
    },
    {
      "id": "negative-slope",
      "title": "En minskning per steg",
      "levels": [
        "high"
      ],
      "compact": true,
      "steps": [
        {
          "parts": [
            {
              "id": "y",
              "text": "y ="
            },
            {
              "id": "rule",
              "text": "−x + 6"
            }
          ],
          "text": "Startvärdet är sex och lutningen är minus ett. y minskar med ett för varje steg som x ökar.",
          "spoken": "y är lika med minus x plus sex."
        },
        {
          "parts": [
            {
              "id": "y",
              "text": "y ="
            },
            {
              "id": "rule",
              "text": "−2 + 6"
            }
          ],
          "text": "När x är två ersätter vi x med två. Minustecknet framför x finns kvar.",
          "spoken": "y är lika med minus två plus sex."
        },
        {
          "parts": [
            {
              "id": "y",
              "text": "y ="
            },
            {
              "id": "rule",
              "text": "4"
            }
          ],
          "text": "y blir fyra. Negativ lutning betyder minskning, inte att varje y-värde måste vara negativt.",
          "spoken": "y är lika med fyra."
        }
      ]
    }
  ]
},

  volumeLanguage: {
  "title": "Rätblock och volym",
  "description": "Skilj mellan yta och volym och förstå basyta och höjd.",
  "levels": [
    "high"
  ],
  "languageFocused": true,
  "walkthrough": [
    [
      "Tre dimensioner",
      "Längd · bredd · höjd",
      "Volym beskriver hur mycket utrymme en kropp upptar eller hur mycket en behållare rymmer. Längd, bredd och höjd beskriver tre riktningar.",
      "Area beskriver en ytas storlek. Volym beskriver ett tredimensionellt utrymme."
    ],
    [
      "Börja med basytans area",
      "B = 3 cm × 2 cm = 6 cm²",
      "Ett rätblock har rektangulära sidoytor. Välj en basyta och beräkna dess area genom att multiplicera längd och bredd.",
      "B står här för basytans area, inte för längden av en sida. Höjden mäts vinkelrätt mot basytan."
    ],
    [
      "Bygg på höjden",
      "V = B × h\n6 cm² × 4 cm = 24 cm³",
      "Multiplicera basytans area med höjden för att få rätblockets volym.",
      "Sambandet gäller även prismor och cylindrar. Det gäller inte direkt för exempelvis en kon eller pyramid."
    ]
  ],
  "modes": {
    "rules": [
      {
        "prompt": "Vad beskriver volym?",
        "example": "En lådas innehåll",
        "choices": [
          "Hur mycket utrymme som ryms",
          "Bara längden runt botten",
          "Bara bottnens area"
        ],
        "correct": 0,
        "explanation": "Volym beskriver tredimensionellt utrymme.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad menas med en kub?",
        "example": "En särskild sorts rätblock",
        "choices": [
          "Ett rätblock med bara två sidor",
          "Ett rätblock där alla kanter är lika långa",
          "En kropp med cirkulär basyta"
        ],
        "correct": 1,
        "explanation": "En kub har sex kvadratiska sidoytor och lika långa kanter.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad står B för här?",
        "example": "V = B × h",
        "choices": [
          "Basens omkrets",
          "Breddens längd",
          "Basytans area"
        ],
        "correct": 2,
        "explanation": "B är en area. Multiplicerad med höjden ger den volymen.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Hur mäts höjden?",
        "example": "Från basyta till motstående yta i ett rätblock",
        "choices": [
          "Vinkelrätt mot basytan",
          "Längs valfri diagonal",
          "Runt basytans kant"
        ],
        "correct": 0,
        "explanation": "Höjden är avståndet vinkelrätt mellan de parallella basytorna.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "methods": [
      {
        "prompt": "Vilket steg passar först?",
        "example": "Beräkna ett rätblocks volym",
        "choices": [
          "Addera alla kanter",
          "Beräkna basytans area",
          "Räkna antalet hörn"
        ],
        "correct": 1,
        "explanation": "Basytans area multipliceras sedan med höjden.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad behöver du utöver basytans area?",
        "example": "V = B × h",
        "choices": [
          "Basens omkrets",
          "Kroppens färg",
          "Höjden"
        ],
        "correct": 2,
        "explanation": "Höjden visar hur långt kroppen sträcker sig vinkelrätt mot basytan.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad kontrollerar du före multiplikationen?",
        "example": "Längder anges i cm och dm",
        "choices": [
          "Att längderna skrivs i samma enhet",
          "Att alla tal är lika stora",
          "Att bara det största talet används"
        ],
        "correct": 0,
        "explanation": "Skriv längderna i samma enhet så att volymen får rätt kubikenhet.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Hur beräknar du en kubs volym?",
        "example": "Kantlängden är s",
        "choices": [
          "s + s + s",
          "s × s × s",
          "s × s"
        ],
        "correct": 1,
        "explanation": "Kuben har samma längd, bredd och höjd. Produkten av de tre ger volymen.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "truefalse": [
      {
        "prompt": "Sant eller falskt?",
        "example": "Area och volym beskriver samma sak",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "Area beskriver en yta medan volym beskriver utrymme i tre dimensioner.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "Varje kub är också ett rätblock",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "En kub är ett rätblock med lika långa kanter.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "B × h ger volymen för alla geometriska kroppar",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "Formeln gäller prismor och cylindrar. Koner och pyramider behöver också faktorn en tredjedel.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "Ett rätblocks volym ändras när man vrider det",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "Att vrida kroppen ändrar inte hur mycket utrymme den upptar.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ]
  },
  "animations": [
    {
      "id": "base-height",
      "title": "Från basyta till volym",
      "levels": [
        "high"
      ],
      "compact": true,
      "steps": [
        {
          "parts": [
            {
              "id": "label",
              "text": "B ="
            },
            {
              "id": "value",
              "text": "3 cm × 2 cm"
            }
          ],
          "text": "Rätblockets basyta är tre centimeter lång och två centimeter bred. Vi börjar med att beräkna arean.",
          "spoken": "B är lika med tre centimeter gånger två centimeter."
        },
        {
          "parts": [
            {
              "id": "label",
              "text": "B ="
            },
            {
              "id": "value",
              "text": "6 cm²"
            }
          ],
          "text": "Basytans area är sex kvadratcentimeter. Det är en yta, ännu ingen volym.",
          "spoken": "B är lika med sex kvadratcentimeter."
        },
        {
          "parts": [
            {
              "id": "label",
              "text": "V ="
            },
            {
              "id": "value",
              "text": "6 cm² × 4 cm"
            }
          ],
          "text": "Höjden är fyra centimeter. Vi multiplicerar basytans area med höjden.",
          "spoken": "V är lika med sex kvadratcentimeter gånger fyra centimeter."
        },
        {
          "parts": [
            {
              "id": "label",
              "text": "V ="
            },
            {
              "id": "value",
              "text": "24 cm³"
            }
          ],
          "text": "Volymen blir tjugofyra kubikcentimeter. Kvadratcentimeter gånger centimeter ger kubikcentimeter.",
          "spoken": "V är lika med tjugofyra kubikcentimeter."
        }
      ]
    },
    {
      "id": "cube",
      "title": "En kubs volym",
      "levels": [
        "high"
      ],
      "compact": true,
      "steps": [
        {
          "parts": [
            {
              "id": "side",
              "text": "s = 3 cm"
            }
          ],
          "text": "Kubens kant är tre centimeter. Längd, bredd och höjd är lika stora.",
          "spoken": "s är lika med tre centimeter."
        },
        {
          "parts": [
            {
              "id": "label",
              "text": "V ="
            },
            {
              "id": "product",
              "text": "(3 × 3 × 3) cm³"
            }
          ],
          "text": "Vi multiplicerar tre lika långa mått. Därför används kantlängden tre gånger som faktor.",
          "spoken": "V är lika med tre gånger tre gånger tre kubikcentimeter."
        },
        {
          "parts": [
            {
              "id": "label",
              "text": "V ="
            },
            {
              "id": "product",
              "text": "27 cm³"
            }
          ],
          "text": "Kubens volym är tjugosju kubikcentimeter. Det motsvarar tjugosju små kuber med kanten en centimeter.",
          "spoken": "V är lika med tjugosju kubikcentimeter."
        }
      ]
    }
  ]
},
  volumeUnitsLanguage: {
  "title": "Liter och kubikenheter",
  "description": "Koppla ihop liter, kubikdecimeter och kubikcentimeter.",
  "levels": [
    "high"
  ],
  "languageFocused": true,
  "walkthrough": [
    [
      "En kub som mått",
      "1 cm × 1 cm × 1 cm = 1 cm³",
      "En kubikcentimeter är volymen av en kub vars kanter är en centimeter. Trean visar att tre längder multipliceras.",
      "cm mäter längd, cm² mäter area och cm³ mäter volym."
    ],
    [
      "Koppla ihop systemen",
      "1 l = 1 dm³\n1 ml = 1 cm³",
      "Liter och kubikdecimeter är lika stora volymenheter. Milliliter och kubikcentimeter är också lika stora.",
      "En liter består av tusen milliliter. En kubikdecimeter består av tusen kubikcentimeter."
    ],
    [
      "Tusen i ett kubiksteg",
      "1 dm³ = 1 000 cm³",
      "En decimeter är tio centimeter. Tio gånger fler små längdenheter i tre riktningar ger tio gånger tio gånger tio små kuber.",
      "Mellan m³ och dm³, eller mellan dm³ och cm³, är faktorn tusen. Det skiljer sig från längdenheternas faktor tio."
    ]
  ],
  "modes": {
    "rules": [
      {
        "prompt": "Vad betyder cm³?",
        "example": "En volymenhet",
        "choices": [
          "Kubikcentimeter",
          "Kvadratcentimeter",
          "Tre centimeter"
        ],
        "correct": 0,
        "explanation": "En kubikcentimeter är volymen av en kub med kantlängden en centimeter.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilken enhet är lika stor som en liter?",
        "example": "1 l",
        "choices": [
          "1 cm³",
          "1 dm³",
          "1 m³"
        ],
        "correct": 1,
        "explanation": "En liter motsvarar en kubikdecimeter.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilken enhet är lika stor som en milliliter?",
        "example": "1 ml",
        "choices": [
          "1 dm³",
          "1 mm³",
          "1 cm³"
        ],
        "correct": 2,
        "explanation": "En milliliter motsvarar en kubikcentimeter.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Varför blir faktorn tusen?",
        "example": "Från dm³ till cm³",
        "choices": [
          "Tio gånger tio gånger tio",
          "Tre gånger tio",
          "Bara en längd ändras"
        ],
        "correct": 0,
        "explanation": "Enheten delas i tio delar i var och en av tre riktningar: 10 × 10 × 10 = 1 000.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "methods": [
      {
        "prompt": "Hur byter du från dm³ till cm³?",
        "example": "Samma volym, mindre enhet",
        "choices": [
          "Dividera med tusen",
          "Multiplicera med tusen",
          "Multiplicera med tio"
        ],
        "correct": 1,
        "explanation": "Det ryms tusen kubikcentimeter i en kubikdecimeter.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Hur byter du från cm³ till dm³?",
        "example": "Samma volym, större enhet",
        "choices": [
          "Multiplicera med tusen",
          "Dividera med tio",
          "Dividera med tusen"
        ],
        "correct": 2,
        "explanation": "Tusen kubikcentimeter bildar en kubikdecimeter.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Hur jämför du 2 l och 1 500 cm³?",
        "example": "Två olika volymenheter",
        "choices": [
          "Skriv båda i samma enhet",
          "Jämför bara 2 och 1 500",
          "Addera talen direkt"
        ],
        "correct": 0,
        "explanation": "2 l = 2 000 cm³. Då går volymerna att jämföra direkt.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilket samband hjälper dig från m³ till liter?",
        "example": "1 m³ = 1 000 dm³",
        "choices": [
          "1 cm³ = 1 l",
          "1 dm³ = 1 l",
          "1 m = 1 l"
        ],
        "correct": 1,
        "explanation": "Varje kubikdecimeter är en liter. Därför är en kubikmeter tusen liter.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "truefalse": [
      {
        "prompt": "Sant eller falskt?",
        "example": "En kubikdecimeter är tio kubikcentimeter",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "Det går tio små längdenheter i tre riktningar, alltså tusen små kuber.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "2 l och 2 dm³ beskriver samma volym",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "En liter och en kubikdecimeter är lika stora enheter.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "Mätetalet blir större vid byte till en mindre volymenhet",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "Samma volym kräver fler små enheter än stora enheter.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "En kubikmeter motsvarar hundra liter",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "En kubikmeter är tusen kubikdecimeter och därmed tusen liter.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ]
  },
  "animations": [
    {
      "id": "cubic-step",
      "title": "Varför tusen små kuber?",
      "levels": [
        "high"
      ],
      "compact": true,
      "steps": [
        {
          "parts": [
            {
              "id": "left",
              "text": "1 dm"
            },
            {
              "id": "equal",
              "text": "="
            },
            {
              "id": "right",
              "text": "10 cm"
            }
          ],
          "text": "En kub har kanten en decimeter. Längs varje kant får tio centimeter plats.",
          "spoken": "En decimeter är lika med tio centimeter."
        },
        {
          "parts": [
            {
              "id": "left",
              "text": "1 dm³"
            },
            {
              "id": "equal",
              "text": "="
            },
            {
              "id": "right",
              "text": "(10 × 10 × 10) cm³"
            }
          ],
          "text": "I tre riktningar blir det tio gånger tio gånger tio små kuber. Varje liten kub är en kubikcentimeter.",
          "spoken": "En kubikdecimeter är lika med tio gånger tio gånger tio kubikcentimeter."
        },
        {
          "parts": [
            {
              "id": "left",
              "text": "1 dm³"
            },
            {
              "id": "equal",
              "text": "="
            },
            {
              "id": "right",
              "text": "1 000 cm³"
            }
          ],
          "text": "Det blir tusen kubikcentimeter. Därför multiplicerar vi mätetalet med tusen vid detta enhetsbyte.",
          "spoken": "En kubikdecimeter är lika med tusen kubikcentimeter."
        }
      ]
    },
    {
      "id": "litres",
      "title": "Från liter till kubikcentimeter",
      "levels": [
        "high"
      ],
      "compact": true,
      "steps": [
        {
          "parts": [
            {
              "id": "amount",
              "text": "2 l"
            }
          ],
          "text": "Vi börjar med två liter. Vi vill beskriva samma volym i kubikcentimeter.",
          "spoken": "Två liter."
        },
        {
          "parts": [
            {
              "id": "amount",
              "text": "2 l"
            },
            {
              "id": "equal",
              "text": "="
            },
            {
              "id": "cubic",
              "text": "2 dm³"
            }
          ],
          "text": "En liter är en kubikdecimeter. Två liter är därför två kubikdecimeter.",
          "spoken": "Två liter är lika med två kubikdecimeter."
        },
        {
          "parts": [
            {
              "id": "amount",
              "text": "2 l"
            },
            {
              "id": "equal",
              "text": "="
            },
            {
              "id": "cubic",
              "text": "2 000 cm³"
            }
          ],
          "text": "Varje kubikdecimeter är tusen kubikcentimeter. Två liter blir två tusen kubikcentimeter.",
          "spoken": "Två liter är lika med två tusen kubikcentimeter."
        }
      ]
    }
  ]
},

  prefixLanguage: {
  "title": "Förstå prefix",
  "description": "Tolka kilo, hekto, deci, centi, milli och mega.",
  "levels": [
    "high"
  ],
  "languageFocused": true,
  "walkthrough": [
    [
      "En förstavelse med betydelse",
      "kilo = tusen\n1 kg = 1 000 g",
      "Ett prefix framför en enhet anger en faktor. Kilo betyder tusen, så ett kilogram är tusen gram.",
      "Prefixet berättar om storleken på enheten. kg och g kan beskriva samma massa med olika mätetal."
    ],
    [
      "Hundra eller en hundradel",
      "hekto = 100 · centi = 1/100",
      "Hekto betyder hundra gånger enheten. Centi betyder en hundradel av enheten.",
      "Hekto förstorar enheten medan centi förminskar den. Ett hektogram är 100 gram och en centimeter är 0,01 meter."
    ],
    [
      "Bokstäverna spelar roll",
      "m = milli · M = mega",
      "Som prefix betyder litet m en tusendel och stort M en miljon. Stor och liten bokstav kan ändra betydelsen.",
      "I mg står m för milli och g för gram. Enhetssymbolen m ensam betyder meter."
    ]
  ],
  "modes": {
    "rules": [
      {
        "prompt": "Vad beskriver ett prefix?",
        "example": "kilo i kilogram",
        "choices": [
          "En faktor framför enheten",
          "Antalet decimaler i svaret",
          "Ett räknesätt"
        ],
        "correct": 0,
        "explanation": "Prefixet kilo anger faktorn tusen.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad betyder hekto?",
        "example": "1 hg = 100 g",
        "choices": [
          "En hundradel",
          "Hundra",
          "Tusen"
        ],
        "correct": 1,
        "explanation": "Hekto betyder hundra gånger enheten.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilket prefix betyder en tusendel?",
        "example": "1 mg = 0,001 g",
        "choices": [
          "Kilo",
          "Centi",
          "Milli"
        ],
        "correct": 2,
        "explanation": "Milli betyder en tusendel, medan centi betyder en hundradel.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad betyder mega?",
        "example": "M som prefix",
        "choices": [
          "En miljon",
          "En tusendel",
          "Tio"
        ],
        "correct": 0,
        "explanation": "Mega betecknas med stort M och betyder en miljon.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "methods": [
      {
        "prompt": "Hur tolkar du centi i centimeter?",
        "example": "1 cm = 0,01 m",
        "choices": [
          "Hundra meter",
          "En hundradels meter",
          "En tusendels meter"
        ],
        "correct": 1,
        "explanation": "Centi är en hundradel. Hundra centimeter bildar en meter.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad händer med mätetalet från kg till g?",
        "example": "Samma massa",
        "choices": [
          "Det divideras med tusen",
          "Det ändras inte",
          "Det multipliceras med tusen"
        ],
        "correct": 2,
        "explanation": "Gram är en mindre enhet, så det behövs tusen gånger så många gram.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Hur skriver du milliliter som liter?",
        "example": "1 000 ml = 1 l",
        "choices": [
          "Dividera mätetalet med tusen",
          "Multiplicera med tusen",
          "Subtrahera tusen"
        ],
        "correct": 0,
        "explanation": "Varje milliliter är en tusendels liter.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad bör du kontrollera i enhetssymbolen?",
        "example": "mg och Mg",
        "choices": [
          "Bara sista bokstaven",
          "Även stor eller liten bokstav",
          "Bara antal bokstäver"
        ],
        "correct": 1,
        "explanation": "mg är milligram och Mg är megagram. Prefixen har olika storlek.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "truefalse": [
      {
        "prompt": "Sant eller falskt?",
        "example": "Deci betyder en tiondel",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "En deciliter är en tiondels liter.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "Centi och milli betyder samma sak",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "Centi betyder en hundradel och milli en tusendel.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "Ett prefixbyte förändrar automatiskt föremålets massa",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "Du kan beskriva samma massa i exempelvis kilogram och gram.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "Kilo betecknas med litet k",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "Exempelvis skrivs kilogram kg och kilometer km.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ]
  },
  "animations": [
    {
      "id": "kilo",
      "title": "Från kilogram till gram",
      "levels": [
        "high"
      ],
      "compact": true,
      "steps": [
        {
          "parts": [
            {
              "id": "amount",
              "text": "2 kg"
            }
          ],
          "text": "Vi börjar med två kilogram. Kilo betyder tusen.",
          "spoken": "Två kilogram."
        },
        {
          "parts": [
            {
              "id": "amount",
              "text": "2 kg"
            },
            {
              "id": "equals",
              "text": "="
            },
            {
              "id": "base",
              "text": "2 × 1 000 g"
            }
          ],
          "text": "Varje kilogram är tusen gram. Därför tar vi två gånger tusen gram.",
          "spoken": "Två kilogram är lika med två gånger tusen gram."
        },
        {
          "parts": [
            {
              "id": "amount",
              "text": "2 kg"
            },
            {
              "id": "equals",
              "text": "="
            },
            {
              "id": "base",
              "text": "2 000 g"
            }
          ],
          "text": "Två kilogram är två tusen gram. Massan är oförändrad, men enheten är mindre.",
          "spoken": "Två kilogram är lika med två tusen gram."
        }
      ]
    },
    {
      "id": "milli",
      "title": "Från milliliter till liter",
      "levels": [
        "high"
      ],
      "compact": true,
      "steps": [
        {
          "parts": [
            {
              "id": "amount",
              "text": "500 ml"
            }
          ],
          "text": "Vi börjar med femhundra milliliter. Milli betyder en tusendel.",
          "spoken": "Femhundra milliliter."
        },
        {
          "parts": [
            {
              "id": "amount",
              "text": "500 ml"
            },
            {
              "id": "equals",
              "text": "="
            },
            {
              "id": "base",
              "text": "(500 ÷ 1 000) l"
            }
          ],
          "text": "Tusen milliliter är en liter. Vi dividerar mätetalet med tusen.",
          "spoken": "Femhundra milliliter är lika med femhundra dividerat med tusen, uttryckt i liter."
        },
        {
          "parts": [
            {
              "id": "amount",
              "text": "500 ml"
            },
            {
              "id": "equals",
              "text": "="
            },
            {
              "id": "base",
              "text": "0,5 l"
            }
          ],
          "text": "Volymen är en halv liter. Samma volym har nu ett mindre mätetal och en större enhet.",
          "spoken": "Femhundra milliliter är lika med noll komma fem liter."
        }
      ]
    }
  ]
},
  combinationLanguage: {
  "title": "Räkna möjliga val",
  "description": "Förstå ordning, upprepning och multiplikationsprincipen.",
  "levels": [
    "high"
  ],
  "languageFocused": true,
  "walkthrough": [
    [
      "Ett val i varje steg",
      "2 × 3 = 6",
      "Om två tröjor kan kombineras med tre byxor, ger varje tröja tre val. Det blir sex klädkombinationer.",
      "Multiplicera antalet val i stegen när varje val i ett steg kan följas av lika många val i nästa."
    ],
    [
      "Får något väljas igen?",
      "3 × 2 = 6",
      "En kod har två platser och använder A, B eller C. Om en bokstav inte får upprepas finns tre val först och två sedan.",
      "Om bokstäver får upprepas finns i stället tre val på båda platserna: 3 × 3 = 9."
    ],
    [
      "Spelar ordningen roll?",
      "AB och BA",
      "Som koder är AB och BA olika eftersom ordningen spelar roll. Som ett par personer är A och B samma par som B och A.",
      "Bestäm vad som räknas som ett nytt resultat innan du börjar räkna. Annars kan samma grupp räknas två gånger."
    ]
  ],
  "modes": {
    "rules": [
      {
        "prompt": "Vad används multiplikationsprincipen till?",
        "example": "Val i flera steg",
        "choices": [
          "Räkna möjliga valföljder",
          "Beräkna medelvärdet",
          "Mäta längd"
        ],
        "correct": 0,
        "explanation": "Antalet val i stegen multipliceras när antalet fortsättningar är detsamma för varje tidigare val.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad betyder att upprepning är tillåten?",
        "example": "En kod med bokstäver",
        "choices": [
          "Ordningen saknar betydelse",
          "Samma bokstav får väljas igen",
          "Alla bokstäver måste användas"
        ],
        "correct": 1,
        "explanation": "Tillåten upprepning betyder att en redan vald bokstav kan användas igen.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "När räknas AB och BA som olika?",
        "example": "Två möjliga resultat",
        "choices": [
          "Alltid när de är ett par personer",
          "Aldrig",
          "När ordningen spelar roll"
        ],
        "correct": 2,
        "explanation": "I en kod ger olika ordning olika koder.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad betyder en fullständig placering?",
        "example": "Personer som ställs i kö",
        "choices": [
          "Alla personer får en plats",
          "Bara två personer väljs",
          "Alla står på samma plats"
        ],
        "correct": 0,
        "explanation": "Vid en fullständig placering placeras alla objekten i ordning.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "methods": [
      {
        "prompt": "Hur räknar du klädvalen?",
        "example": "2 tröjor, 3 byxor; alla passar ihop",
        "choices": [
          "2 + 3",
          "2 × 3",
          "3 − 2"
        ],
        "correct": 1,
        "explanation": "För var och en av två tröjor finns tre byxor att välja.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad frågar du innan du räknar koder?",
        "example": "Två platser, bokstäverna A, B och C",
        "choices": [
          "Vilken bokstav är snyggast?",
          "Vilken färg har texten?",
          "Får en bokstav upprepas?"
        ],
        "correct": 2,
        "explanation": "Regeln om upprepning avgör hur många val som finns på den andra platsen.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Hur undviker du att räkna ett par två gånger?",
        "example": "A och B ska bilda ett par",
        "choices": [
          "Räkna AB och BA som samma par",
          "Räkna alltid båda ordningarna",
          "Låt A bilda par med sig själv"
        ],
        "correct": 0,
        "explanation": "När ordningen inte spelar roll är AB och BA samma par.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilket arbetssätt hjälper dig kontrollera alla val?",
        "example": "Ett litet kombinationsproblem",
        "choices": [
          "Gissa antalet",
          "Lista valen systematiskt",
          "Räkna bara första valet"
        ],
        "correct": 1,
        "explanation": "En ordnad lista eller tabell hjälper dig upptäcka saknade och dubbelt räknade val.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "truefalse": [
      {
        "prompt": "Sant eller falskt?",
        "example": "Alla kombinationsproblem har tillåten upprepning",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "Uppgiften måste ange om samma objekt får väljas igen.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "Två tröjor och tre byxor ger sex klädval om alla passar ihop",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "Varje tröja ger tre val: 2 × 3 = 6.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "Ett par personer blir ett nytt par om namnen byter plats",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "Personerna i paret är samma även om namnen står i annan ordning.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "Om en bokstav inte får upprepas minskar antalet val efter första valet",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "Med A, B och C finns tre val först och sedan två bokstäver kvar.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ]
  },
  "animations": [
    {
      "id": "repeat",
      "title": "Kod med upprepning",
      "levels": [
        "high"
      ],
      "compact": false,
      "steps": [
        {
          "parts": [
            {
              "id": "first",
              "text": "3"
            }
          ],
          "text": "En kod har två platser. På första platsen kan vi välja A, B eller C: tre möjligheter.",
          "spoken": "Tre."
        },
        {
          "parts": [
            {
              "id": "first",
              "text": "3"
            },
            {
              "id": "times",
              "text": "×"
            },
            {
              "id": "second",
              "text": "3"
            }
          ],
          "text": "Samma bokstav får väljas igen. Därför finns tre val även på andra platsen.",
          "spoken": "Tre gånger tre."
        },
        {
          "parts": [
            {
              "id": "first",
              "text": "3"
            },
            {
              "id": "times",
              "text": "×"
            },
            {
              "id": "second",
              "text": "3"
            },
            {
              "id": "equals",
              "text": "="
            },
            {
              "id": "result",
              "text": "9"
            }
          ],
          "text": "Det finns nio koder, till exempel AA, AB och BA. Ordningen spelar roll.",
          "spoken": "Tre gånger tre är lika med nio."
        }
      ]
    },
    {
      "id": "no-repeat",
      "title": "Kod utan upprepning",
      "levels": [
        "high"
      ],
      "compact": false,
      "steps": [
        {
          "parts": [
            {
              "id": "first",
              "text": "3"
            }
          ],
          "text": "En kod har två platser. På första platsen kan vi välja A, B eller C: tre möjligheter.",
          "spoken": "Tre."
        },
        {
          "parts": [
            {
              "id": "first",
              "text": "3"
            },
            {
              "id": "times",
              "text": "×"
            },
            {
              "id": "second",
              "text": "2"
            }
          ],
          "text": "En bokstav får inte väljas igen. Därför finns två val kvar på andra platsen.",
          "spoken": "Tre gånger två."
        },
        {
          "parts": [
            {
              "id": "first",
              "text": "3"
            },
            {
              "id": "times",
              "text": "×"
            },
            {
              "id": "second",
              "text": "2"
            },
            {
              "id": "equals",
              "text": "="
            },
            {
              "id": "result",
              "text": "6"
            }
          ],
          "text": "Det finns sex koder: AB, AC, BA, BC, CA och CB. Ordningen spelar roll.",
          "spoken": "Tre gånger två är lika med sex."
        }
      ]
    }
  ]
},

  priorityLanguage: {
  "title": "Prioriteringsregler",
  "description": "Förklara ordningen mellan parenteser, potenser och räknesätt.",
  "levels": [
    "high"
  ],
  "languageFocused": true,
  "walkthrough": [
    [
      "Gruppera först",
      "(4 + 3) × 2 = 7 × 2",
      "En parentes visar vilka delar som hör ihop. Beräkna det som står i parentesen först.",
      "Inuti parentesen gäller samma prioriteringsregler som i resten av uttrycket."
    ],
    [
      "Olika prioritet",
      "2 + 3² = 2 + 9 = 11",
      "Efter parenteser beräknas potenser. Sedan multiplikation och division, och sist addition och subtraktion.",
      "Multiplikation och division har samma prioritet. Addition och subtraktion har också samma prioritet."
    ],
    [
      "Vid samma prioritet",
      "12 ÷ 3 × 2 = 4 × 2 = 8",
      "Räknesätt med samma prioritet utförs från vänster till höger.",
      "Multiplikation går alltså inte alltid före division. Här kommer divisionen först."
    ]
  ],
  "modes": {
    "rules": [
      {
        "prompt": "Vad visar parentesen?",
        "example": "(4 + 3) × 2",
        "choices": [
          "Vad som ska beräknas först",
          "Att multiplikation ska hoppas över",
          "Att svaret måste bli negativt"
        ],
        "correct": 0,
        "explanation": "Beräkna summan i parentesen innan du multiplicerar med två.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad kommer före addition?",
        "example": "4 + 3 × 2",
        "choices": [
          "Det vänstra talet",
          "Multiplikationen",
          "Likhetstecknet"
        ],
        "correct": 1,
        "explanation": "Multiplikation har högre prioritet än addition.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilka har samma prioritet?",
        "example": "Räknesättens ordning",
        "choices": [
          "Addition och multiplikation",
          "Potenser och subtraktion",
          "Multiplikation och division"
        ],
        "correct": 2,
        "explanation": "Multiplikation och division beräknas på samma prioriteringsnivå.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilket håll gäller vid samma prioritet?",
        "example": "12 − 3 + 2",
        "choices": [
          "Från vänster till höger",
          "Alltid plus först",
          "Från höger till vänster"
        ],
        "correct": 0,
        "explanation": "Addition och subtraktion har samma prioritet. Börja därför från vänster.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "methods": [
      {
        "prompt": "Vad gör du först?",
        "example": "2 + 3²",
        "choices": [
          "Adderar 2 och 3",
          "Beräknar 3²",
          "Multiplicerar 2 och 3"
        ],
        "correct": 1,
        "explanation": "Potensen beräknas före additionen.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilket steg bevarar uttryckets värde?",
        "example": "4 + 3 × 2",
        "choices": [
          "7 × 2",
          "4 × 6",
          "4 + 6"
        ],
        "correct": 2,
        "explanation": "Beräkna produkten 3 × 2 först och behåll termen 4.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Hur får du additionen att ske först?",
        "example": "4 + 3 × 2",
        "choices": [
          "Sätt parentes runt 4 + 3",
          "Sätt parentes runt 3 × 2",
          "Byt bara plats på 4 och 3"
        ],
        "correct": 0,
        "explanation": "(4 + 3) × 2 anger en annan beräkningsordning och ger ett annat värde.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Hur börjar du här?",
        "example": "12 ÷ 3 × 2",
        "choices": [
          "Beräknar 3 × 2",
          "Beräknar 12 ÷ 3",
          "Adderar alla talen"
        ],
        "correct": 1,
        "explanation": "Division och multiplikation har samma prioritet. Börja från vänster.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "truefalse": [
      {
        "prompt": "Sant eller falskt?",
        "example": "Addition ska alltid utföras från vänster innan man multiplicerar",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "Multiplikation har högre prioritet än addition, om inte parenteser anger annat.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "En parentes kan ändra uttryckets värde",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "4 + 3 × 2 = 10, men (4 + 3) × 2 = 14.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "Division ska alltid utföras efter multiplikation",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "De har samma prioritet och beräknas från vänster till höger.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "Prioriteringsregler gäller även inuti parenteser",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "I parentesen (2 + 3 × 4) beräknas multiplikationen först.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ]
  },
  "animations": [
    {
      "id": "multiply-first",
      "title": "Multiplikation före addition",
      "levels": [
        "high"
      ],
      "compact": false,
      "steps": [
        {
          "parts": [
            {
              "id": "first",
              "text": "4"
            },
            {
              "id": "plus",
              "text": "+"
            },
            {
              "id": "product",
              "text": "3 × 2"
            }
          ],
          "text": "Här finns både addition och multiplikation. Produkten tre gånger två ska beräknas först.",
          "spoken": "Fyra plus tre gånger två."
        },
        {
          "parts": [
            {
              "id": "first",
              "text": "4"
            },
            {
              "id": "plus",
              "text": "+"
            },
            {
              "id": "product",
              "text": "6"
            }
          ],
          "text": "Tre gånger två är sex. Vi ersätter produkten med sex och behåller termen fyra.",
          "spoken": "Fyra plus sex."
        },
        {
          "parts": [
            {
              "id": "first",
              "text": "4"
            },
            {
              "id": "plus",
              "text": "+"
            },
            {
              "id": "product",
              "text": "6"
            },
            {
              "id": "equals",
              "text": "="
            },
            {
              "id": "sum",
              "text": "10"
            }
          ],
          "text": "Nu adderar vi. Summan blir tio.",
          "spoken": "Fyra plus sex är lika med tio."
        }
      ]
    }
  ]
},
  percentChangeLanguage: {
  "title": "Procentuell förändring",
  "description": "Skilj mellan förändringen, ursprungsvärdet och det nya värdet.",
  "levels": [
    "high"
  ],
  "languageFocused": true,
  "walkthrough": [
    [
      "Välj jämförelsevärde",
      "100 kr → 120 kr",
      "En procentuell förändring jämförs med värdet från början. Här är ursprungsvärdet 100 kronor.",
      "Skillnaden är 20 kronor. Dividera förändringen med ursprungsvärdet för att få förändringen i decimalform."
    ],
    [
      "Beskriv det som blir kvar",
      "100 % − 20 % = 80 %",
      "En sänkning med 20 procent betyder att 80 procent av ursprungsvärdet återstår.",
      "80 procent skrivs 0,8 i decimalform. Det är förändringsfaktorn vid denna sänkning."
    ],
    [
      "Använd en faktor",
      "100 kr × 1,2 = 120 kr",
      "Vid en höjning med 20 procent är förändringsfaktorn 1 + 0,2 = 1,2. Multiplicera det gamla värdet med faktorn.",
      "Vid en sänkning med 20 procent är faktorn 1 − 0,2 = 0,8. Talet 1 står för hela ursprungsvärdet."
    ]
  ],
  "modes": {
    "rules": [
      {
        "prompt": "Vad jämförs förändringen med?",
        "example": "Pris från 100 kr till 120 kr",
        "choices": [
          "Priset från början",
          "Bara det nya priset",
          "Antalet varor"
        ],
        "correct": 0,
        "explanation": "Procentuell förändring utgår från ursprungsvärdet, här 100 kronor.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad menas med ordinarie pris?",
        "example": "En vara säljs med rabatt",
        "choices": [
          "Priset efter rabatten",
          "Priset utan rabatt",
          "Bara rabattens storlek"
        ],
        "correct": 1,
        "explanation": "Det ordinarie priset är priset innan rabatten dras av.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad betyder förändringsfaktor 0,8?",
        "example": "Nytt värde = gammalt värde × 0,8",
        "choices": [
          "Värdet har ökat med 80 %",
          "Värdet har minskat med 80 %",
          "80 % av ursprungsvärdet återstår"
        ],
        "correct": 2,
        "explanation": "0,8 motsvarar 80 procent. Minskningen är 20 procent.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilken faktor hör till en ökning med 20 %?",
        "example": "100 % + 20 % = 120 %",
        "choices": [
          "1,2",
          "0,2",
          "0,8"
        ],
        "correct": 0,
        "explanation": "120 procent är 1,2 i decimalform.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "methods": [
      {
        "prompt": "Hur beskriver du en minskning med 30 %?",
        "example": "Välj förändringsfaktor",
        "choices": [
          "1 + 0,3",
          "1 − 0,3",
          "1 ÷ 0,3"
        ],
        "correct": 1,
        "explanation": "Dra av förändringen från hela ursprungsvärdet: 1 − 0,3 = 0,7.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilken metod ger det nya värdet?",
        "example": "Ursprungsvärdet och faktorn är kända",
        "choices": [
          "Addera värdet och faktorn",
          "Dividera alltid med hundra",
          "Multiplicera värdet med faktorn"
        ],
        "correct": 2,
        "explanation": "Förändringsfaktorn anger hur stor del av ursprungsvärdet det nya värdet är.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilken kvot beskriver ökningen?",
        "example": "Pris från 100 kr till 120 kr",
        "choices": [
          "20 ÷ 100",
          "20 ÷ 120",
          "100 ÷ 20"
        ],
        "correct": 0,
        "explanation": "Ökningen är 20 kronor och jämförs med ursprungsvärdet 100 kronor.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad utgår nästa procentändring från?",
        "example": "Först höjning, sedan sänkning",
        "choices": [
          "Alltid det första priset",
          "Det senast ändrade priset",
          "Bara den första förändringen"
        ],
        "correct": 1,
        "explanation": "Varje ändring utgår från det värde som gäller just då.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "truefalse": [
      {
        "prompt": "Sant eller falskt?",
        "example": "Faktor 1 betyder oförändrat värde",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "Att multiplicera med 1 bevarar värdet.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "En sänkning med 20 % betyder att 20 % återstår",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "80 procent återstår, eftersom 100 − 20 = 80.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "En höjning och sedan sänkning med samma procentsats tar alltid ut varandra",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "De räknas på olika värden. 100 ökat med 20 procent blir 120; minskat med 20 procent blir det sedan 96.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "Faktor 1,3 innebär en ökning med 30 %",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "Hela ursprungsvärdet är 1 och ökningen är 0,3, så faktorn är 1,3.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ]
  },
  "animations": [
    {
      "id": "discount",
      "title": "En rabatt på 20 procent",
      "levels": [
        "high"
      ],
      "compact": true,
      "steps": [
        {
          "parts": [
            {
              "id": "price",
              "text": "100 kr"
            }
          ],
          "text": "Vi börjar med priset hundra kronor. Det motsvarar hela ursprungsvärdet.",
          "spoken": "Hundra kronor."
        },
        {
          "parts": [
            {
              "id": "whole",
              "text": "100 %"
            },
            {
              "id": "minus",
              "text": "−"
            },
            {
              "id": "discount",
              "text": "20 %"
            },
            {
              "id": "equals",
              "text": "="
            },
            {
              "id": "remaining",
              "text": "80 %"
            }
          ],
          "text": "Rabatten är tjugo procent. Då återstår åttio procent av priset.",
          "spoken": "Hundra procent minus tjugo procent är lika med åttio procent."
        },
        {
          "parts": [
            {
              "id": "price",
              "text": "100 kr"
            },
            {
              "id": "times",
              "text": "×"
            },
            {
              "id": "factor",
              "text": "0,8"
            }
          ],
          "text": "Åttio procent skrivs 0,8. Vi multiplicerar ursprungspriset med förändringsfaktorn.",
          "spoken": "Hundra kronor gånger noll komma åtta."
        },
        {
          "parts": [
            {
              "id": "price",
              "text": "100 kr"
            },
            {
              "id": "times",
              "text": "×"
            },
            {
              "id": "factor",
              "text": "0,8"
            },
            {
              "id": "equals",
              "text": "="
            },
            {
              "id": "result",
              "text": "80 kr"
            }
          ],
          "text": "Det nya priset är åttio kronor. Det är priset efter rabatten.",
          "spoken": "Hundra kronor gånger noll komma åtta är lika med åttio kronor."
        }
      ]
    }
  ]
},

  powerRootLanguage: {
  "title": "Potenser och kvadratrötter",
  "description": "Förstå bas, exponent, kvadrat och kvadratrot.",
  "levels": [
    "high"
  ],
  "languageFocused": true,
  "walkthrough": [
    [
      "Upprepad multiplikation",
      "2³ = 2 × 2 × 2 = 8",
      "En potens kan beskriva upprepad multiplikation. Här är 2 basen och 3 exponenten.",
      "En positiv heltalsexponent anger hur många gånger basen finns med som faktor."
    ],
    [
      "Ett tal i kvadrat",
      "5² = 5 × 5 = 25",
      "Att kvadrera ett tal betyder att multiplicera talet med sig självt.",
      "Upphöjt till två kallas i kvadrat. Det betyder inte att dubbla talet."
    ],
    [
      "Gå tillbaka med roten",
      "√25 = 5",
      "Kvadratroten ur ett icke-negativt tal är det icke-negativa tal vars kvadrat är det ursprungliga talet.",
      "Både 5 och −5 har kvadraten 25, men symbolen √25 betecknar bara 5."
    ]
  ],
  "modes": {
    "rules": [
      {
        "prompt": "Vad kallas tvåan?",
        "example": "2³ = 8",
        "choices": [
          "Bas",
          "Exponent",
          "Kvot"
        ],
        "correct": 0,
        "explanation": "Basen är talet som multipliceras med sig självt.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad anger trean?",
        "example": "2³ = 2 × 2 × 2",
        "choices": [
          "Summan av faktorerna",
          "Antalet faktorer 2",
          "Antalet additioner"
        ],
        "correct": 1,
        "explanation": "Exponent 3 betyder tre faktorer som alla är 2.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad betyder i kvadrat?",
        "example": "5² = 25",
        "choices": [
          "Dela talet med två",
          "Dubbla talet",
          "Multiplicera talet med sig självt"
        ],
        "correct": 2,
        "explanation": "5² betyder 5 × 5.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilket ord hör till symbolen?",
        "example": "√25 = 5",
        "choices": [
          "Kvadratrot",
          "Differens",
          "Procent"
        ],
        "correct": 0,
        "explanation": "√ är tecknet för kvadratrot.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "methods": [
      {
        "prompt": "Hur skriver du produkten kortare?",
        "example": "3 × 3 × 3 × 3",
        "choices": [
          "3 × 4",
          "3⁴",
          "4³"
        ],
        "correct": 1,
        "explanation": "Basen är 3 och den finns med som faktor fyra gånger.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilken fråga hjälper dig hitta √36?",
        "example": "Kvadratrot",
        "choices": [
          "Vilket tal ska dubblas?",
          "Vilket tal ska delas med två?",
          "Vilket icke-negativt tal har kvadraten 36?"
        ],
        "correct": 2,
        "explanation": "6 × 6 = 36, alltså är √36 = 6.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Hur kontrollerar du kvadratroten?",
        "example": "√49 = 7",
        "choices": [
          "Beräkna 7 × 7",
          "Beräkna 7 + 7",
          "Beräkna 49 × 7"
        ],
        "correct": 0,
        "explanation": "Kvadrera det föreslagna icke-negativa svaret: 7² = 49.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilket uttryck betyder dubbla fem?",
        "example": "Skilj dubbelt från kvadrat",
        "choices": [
          "5²",
          "2 × 5",
          "√5"
        ],
        "correct": 1,
        "explanation": "Dubbla är multiplicera med två. Kvadrera är multiplicera talet med sig självt.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "truefalse": [
      {
        "prompt": "Sant eller falskt?",
        "example": "Exponent 2 betyder alltid att basen ska dubblas",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "Exponent 2 betyder att basen multipliceras med sig självt.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "4² och 2⁴ har samma värde",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "4 × 4 = 16 och 2 × 2 × 2 × 2 = 16. Olika potenser kan ha samma värde.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "√9 betecknar både 3 och −3",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "√9 betecknar det icke-negativa värdet 3.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "Ett tal i kubik har exponenten 3",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "Till exempel är 2³ = 2 × 2 × 2 = 8.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ]
  }
},
  lengthLanguage: {
  "title": "Längd och enhetsbyten",
  "description": "Beskriv samma längd med olika enheter.",
  "levels": [
    "high"
  ],
  "languageFocused": true,
  "walkthrough": [
    [
      "Tal och enhet hör ihop",
      "1 m = 10 dm = 100 cm",
      "En längd anges med ett mätetal och en enhet. Samma längd kan uttryckas med olika enheter.",
      "Mätetalet ändras när du byter enhet, men längden är densamma."
    ],
    [
      "Mindre enhet, fler delar",
      "2 cm = 20 mm",
      "En centimeter består av tio millimeter. Därför behövs fler millimeter för samma längd.",
      "Från centimeter till millimeter multiplicerar du mätetalet med tio."
    ],
    [
      "Större enhet, färre delar",
      "3 000 m = 3 km",
      "En kilometer är tusen meter. Från meter till kilometer dividerar du mätetalet med tusen.",
      "Kontrollera att mätetalet blir mindre när enheten blir större."
    ]
  ],
  "modes": {
    "rules": [
      {
        "prompt": "Vad är enheten?",
        "example": "12 cm",
        "choices": [
          "Centimeter",
          "Tolv",
          "Längdskillnad"
        ],
        "correct": 0,
        "explanation": "cm är enhetens beteckning. 12 är mätetalet.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilken enhet är minst?",
        "example": "Meter, centimeter, millimeter",
        "choices": [
          "Meter",
          "Millimeter",
          "Centimeter"
        ],
        "correct": 1,
        "explanation": "En millimeter är en tiondels centimeter.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad ändras vid ett enhetsbyte?",
        "example": "1 m = 100 cm",
        "choices": [
          "Själva längden",
          "Bara föremålet",
          "Mätetalet och enheten"
        ],
        "correct": 2,
        "explanation": "Längden bevaras men beskrivs med ett annat mätetal och en annan enhet.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilket samband stämmer?",
        "example": "Kilometer och meter",
        "choices": [
          "1 km = 1 000 m",
          "1 km = 100 m",
          "1 km = 10 m"
        ],
        "correct": 0,
        "explanation": "Prefixet kilo betyder tusen.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "methods": [
      {
        "prompt": "Hur byter du från cm till mm?",
        "example": "Samma längd, mindre enhet",
        "choices": [
          "Dividera med tio",
          "Multiplicera med tio",
          "Addera tio"
        ],
        "correct": 1,
        "explanation": "Varje centimeter innehåller tio millimeter.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Hur byter du från cm till m?",
        "example": "100 cm = 1 m",
        "choices": [
          "Multiplicera med hundra",
          "Subtrahera hundra",
          "Dividera med hundra"
        ],
        "correct": 2,
        "explanation": "Hundra centimeter bildar en meter.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vad gör du före en jämförelse?",
        "example": "80 cm och 1 m",
        "choices": [
          "Skriv längderna i samma enhet",
          "Jämför bara 80 och 1",
          "Ignorera enheterna"
        ],
        "correct": 0,
        "explanation": "1 m = 100 cm, så 80 cm är kortare.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Vilken kontroll passar?",
        "example": "Från meter till kilometer",
        "choices": [
          "Mätetalet ska bli större",
          "Mätetalet ska bli mindre",
          "Längden ska bli längre"
        ],
        "correct": 1,
        "explanation": "En kilometer är större än en meter, så färre kilometer behövs.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ],
    "truefalse": [
      {
        "prompt": "Sant eller falskt?",
        "example": "1 dm och 10 cm är lika långa",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "En decimeter består av tio centimeter.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "Enhetsbyte ändrar föremålets längd",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "Du beskriver samma längd på ett annat sätt.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "2 m är kortare än 50 cm eftersom 2 är mindre än 50",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 1,
        "explanation": "2 m = 200 cm, vilket är längre än 50 cm.",
        "levels": [
          "high"
        ],
        "visual": null
      },
      {
        "prompt": "Sant eller falskt?",
        "example": "En meter består av tusen millimeter",
        "choices": [
          "Sant",
          "Falskt"
        ],
        "correct": 0,
        "explanation": "1 m = 100 cm och varje centimeter är 10 mm.",
        "levels": [
          "high"
        ],
        "visual": null
      }
    ]
  }
},

  coordinateLanguage: {
    title: "Läs koordinater",
    description: "Förstå axlar, origo och en punkts läge.",
    levels: ["high"],
    languageFocused: true,
    walkthrough: [
      ["Två riktningar", "x först, sedan y", "x-axeln är vågrät och y-axeln lodrät. Koordinaterna anger en punkts läge i dessa två riktningar.", "I ett koordinatpar kommer x-värdet först och y-värdet sedan."],
      ["Utgå från mitten", "Origo", "Axlarna möts i origo. Där är både x och y noll.", "Till höger är x positivt. Ovanför är y positivt. Åt motsatta hållen blir värdena negativa.", {"type": "coordinates", "points": [{"x": 0, "y": 0, "label": "A"}], "alt": "Koordinatsystem med enhetssteg. Punkt A ligger vid x=0 och y=0."}],
      ["Läs en punkt", "Sidled, sedan höjd", "Läs först punktens läge längs x-axeln och sedan längs y-axeln.", "Kontrollera axlarnas skala. Ett steg i rutnätet behöver inte alltid motsvara ett."],
    ],
    modes: {
      graphic: [
        q("Vilka koordinater har A?", "Läs x först och sedan y", ["(1, 2)", "(2, 1)", "(−2, 1)"], 1, "A ligger två steg åt höger och ett steg upp från origo.", ["high"], {"type": "coordinates", "points": [{"x": 2, "y": 1, "label": "A"}], "alt": "Koordinatsystem med enhetssteg. Punkt A ligger vid x=2 och y=1."}),
        q("Vad stämmer om A?", "Läs tecknen på koordinaterna", ["Båda är positiva", "x är positivt, y negativt", "x är negativt, y positivt"], 2, "A ligger till vänster om y-axeln och ovanför x-axeln.", ["high"], {"type": "coordinates", "points": [{"x": -2, "y": 1, "label": "A"}], "alt": "Koordinatsystem med enhetssteg. Punkt A ligger vid x=-2 och y=1."}),
        q("Var ligger A?", "Axlarna möts", ["I origo", "På läget (1, 1)", "Utanför koordinatsystemet"], 0, "A ligger där båda koordinaterna är noll.", ["high"], {"type": "coordinates", "points": [{"x": 0, "y": 0, "label": "A"}], "alt": "Koordinatsystem med enhetssteg. Punkt A ligger vid x=0 och y=0."}),
        q("Vilken koordinat är noll?", "A ligger på en axel", ["y-koordinaten", "x-koordinaten", "Ingen av dem"], 1, "På y-axeln är läget i sidled noll, så x är noll.", ["high"], {"type": "coordinates", "points": [{"x": 0, "y": 2, "label": "A"}], "alt": "Koordinatsystem med enhetssteg. Punkt A ligger vid x=0 och y=2."}),
      ],
      rules: [
        q("Vilken axel är vågrät?", "Koordinatsystem", ["x-axeln", "y-axeln", "Båda axlarna"], 0, "x-axeln går i sidled. y-axeln går i höjdled.", ["high"]),
        q("Vad kallas axlarnas möte?", "Skärningspunkten", ["En katet", "Origo", "En täljare"], 1, "Axlarna möts i origo, där båda koordinaterna är noll.", ["high"], {"type": "coordinates", "points": [{"x": 0, "y": 0, "label": "A"}], "alt": "Koordinatsystem med enhetssteg. Punkt A ligger vid x=0 och y=0."}),
        q("Vad anger första koordinaten?", "(x, y)", ["Punktens namn", "Läget i höjdled", "Läget i sidled"], 2, "x-koordinaten skrivs först och anger läget i sidled.", ["high"]),
        q("Vilken koordinat är positiv?", "En punkt ovanför x-axeln", ["y-koordinaten", "Alltid båda", "Alltid x-koordinaten"], 0, "Ovanför x-axeln är y positivt. x beror på punktens läge i sidled.", ["high"]),
      ],
      methods: [
        q("Vad läser du först?", "Bestäm punktens koordinater", ["Punktens färg", "Läget längs x-axeln", "Avståndet till närmaste hörn"], 1, "Läs x först och sedan y. Det är ordningen i koordinatparet.", ["high"]),
        q("Hur går du vid negativt x?", "Utgå från origo", ["Uppåt", "Nedåt", "Åt vänster"], 2, "Negativa x-värden finns till vänster om y-axeln.", ["high"]),
        q("Hur går du vid negativt y?", "Utgå från x-axeln", ["Nedåt", "Åt höger", "Uppåt"], 0, "Negativa y-värden ligger under x-axeln.", ["high"]),
        q("Vad kontrollerar du innan du räknar rutor?", "Koordinatsystemets gradering", ["Hur tjocka linjerna är", "Vad varje steg motsvarar", "Vilken bokstav punkten har"], 1, "Läs axlarnas skalvärden. Graderingen avgör värdet av varje steg.", ["high"]),
      ],
      truefalse: [
        q("Sant eller falskt?", "x och y kan byta plats utan att punktens läge ändras", ["Sant", "Falskt"], 1, "Ordningen spelar roll. Att byta x och y kan ge en annan punkt.", ["high"]),
        q("Sant eller falskt?", "En punkt på y-axeln har x-värdet noll", ["Sant", "Falskt"], 0, "Punkten ligger inte åt höger eller vänster om y-axeln, så x är noll.", ["high"]),
        q("Sant eller falskt?", "Origo har båda koordinaterna noll", ["Sant", "Falskt"], 0, "Origo är axlarnas gemensamma nollpunkt.", ["high"]),
        q("Sant eller falskt?", "Alla punkter under x-axeln har negativt x", ["Sant", "Falskt"], 1, "Under x-axeln är y negativt. x kan vara positivt, negativt eller noll.", ["high"]),
      ],
    },
  },
  pythagorasLanguage: {
    title: "Förstå Pythagoras sats",
    description: "Skilj mellan kateter och hypotenusa och välj rätt metod.",
    levels: ["high"],
    languageFocused: true,
    walkthrough: [
      ["Börja med vinkeln", "En rätvinklig triangel", "Pythagoras sats gäller för rätvinkliga trianglar. Den lilla fyrkanten markerar den räta vinkeln.", "Sidan mitt emot den räta vinkeln heter hypotenusa. De andra två heter kateter.", {"type": "triangle", "alt": "Rätvinklig triangel. Sidorna a och b möts vid markeringen för rät vinkel. Sida c ligger mitt emot. Sida c är tjockt markerad.", "emphasis": "hypotenuse"}],
      ["Sambandet mellan sidorna", "a² + b² = c²", "Kvadraterna på kateternas längder har tillsammans samma värde som kvadraten på hypotenusans längd.", "Här står a och b för kateterna och c för hypotenusan. Kvadrat betyder att längdtalet multipliceras med sig självt."],
      ["Välj vilken sida du söker", "Addera eller subtrahera", "Söker du hypotenusan adderar du kateternas kvadrater. Söker du en katet subtraherar du den andra katetens kvadrat från hypotenusans kvadrat.", "Till sist tar du kvadratroten för att få längden, eftersom du först har beräknat längdens kvadrat."],
    ],
    modes: {
      graphic: [
        q("Vilken sida är hypotenusan?", "Hitta den räta vinkeln", ["a", "b", "c"], 2, "c ligger mitt emot den räta vinkeln och är hypotenusan.", ["high"], {"type": "triangle", "alt": "Rätvinklig triangel. Sidorna a och b möts vid markeringen för rät vinkel. Sida c ligger mitt emot."}),
        q("Vad heter den tjockt markerade sidan?", "Sidans roll", ["En katet", "En radie", "Hypotenusan"], 0, "b är en av de två sidor som bildar den räta vinkeln.", ["high"], {"type": "triangle", "alt": "Rätvinklig triangel. Sidorna a och b möts vid markeringen för rät vinkel. Sida c ligger mitt emot. Sida b är tjockt markerad.", "emphasis": "leg"}),
        q("Vilket samband passar figuren?", "Sidorna heter a, b och c", ["a + b = c", "a² + b² = c²", "a² + c² = b²"], 1, "a och b är kateterna. Deras kvadrater har summan c².", ["high"], {"type": "triangle", "alt": "Rätvinklig triangel. Sidorna a och b möts vid markeringen för rät vinkel. Sida c ligger mitt emot."}),
        q("Vad visar den lilla fyrkanten?", "Villkoret för satsen", ["Alla sidor är lika långa", "Triangeln har fyra sidor", "Triangeln har en rät vinkel"], 2, "Markeringen visar den räta vinkeln. Därför passar Pythagoras sats.", ["high"], {"type": "triangle", "alt": "Rätvinklig triangel. Sidorna a och b möts vid markeringen för rät vinkel. Sida c ligger mitt emot."}),
      ],
      rules: [
        q("När gäller Pythagoras sats?", "Triangelns form", ["När triangeln är rätvinklig", "För alla trianglar", "Bara om alla sidor är lika"], 0, "Satsen gäller i en triangel som har en rät vinkel.", ["high"], {"type": "triangle", "alt": "Rätvinklig triangel. Sidorna a och b möts vid markeringen för rät vinkel. Sida c ligger mitt emot."}),
        q("Vad heter sidan mitt emot den räta vinkeln?", "Triangelns längsta sida", ["Katet", "Hypotenusa", "Diameter"], 1, "Hypotenusan är sidan mitt emot den räta vinkeln.", ["high"]),
        q("Vad heter de andra två sidorna?", "Sidorna som möts i den räta vinkeln", ["Radier", "Diagonaler", "Kateter"], 2, "De två kateterna bildar den räta vinkeln.", ["high"]),
        q("Vad betyder a²?", "Längdens kvadrat", ["a multiplicerat med a", "a adderat med a", "a dividerat med två"], 0, "a² betyder a gånger a, inte två gånger a.", ["high"], {"type": "triangle", "alt": "Rätvinklig triangel. Sidorna a och b möts vid markeringen för rät vinkel. Sida c ligger mitt emot."}),
      ],
      methods: [
        q("Vad gör du först?", "Välj om satsen passar", ["Mäter figurens färg", "Kontrollerar att vinkeln är rät", "Antar att längsta sidan är en katet"], 1, "Pythagoras sats kräver en rätvinklig triangel.", ["high"]),
        q("Vad adderar du när hypotenusan söks?", "a² + b² = c²", ["Bara sidornas längder", "Alla tre sidorna", "Kateternas kvadrater"], 2, "Summan av kateternas kvadrater ger hypotenusans kvadrat.", ["high"]),
        q("Vad gör du när en katet söks?", "Hypotenusan och en katet är kända", ["Subtraherar den kända katetens kvadrat", "Addera alla längder", "Delar alltid hypotenusan med två"], 0, "Subtrahera den kända katetens kvadrat från hypotenusans kvadrat.", ["high"]),
        q("Vilket steg återstår?", "Du har beräknat sidans kvadrat", ["Dubbla värdet", "Ta kvadratroten", "Lägg till den räta vinkeln"], 1, "Kvadratroten ger den sökta positiva sidlängden.", ["high"]),
      ],
      truefalse: [
        q("Sant eller falskt?", "Hypotenusan ligger mitt emot den räta vinkeln", ["Sant", "Falskt"], 0, "Den sidan är också den längsta i en rätvinklig triangel.", ["high"]),
        q("Sant eller falskt?", "Pythagoras sats säger att kateternas längder ska adderas", ["Sant", "Falskt"], 1, "Det är kvadraterna på längderna som adderas.", ["high"]),
        q("Sant eller falskt?", "Alla trianglar är rätvinkliga", ["Sant", "Falskt"], 1, "En triangel måste ha en rät vinkel för att Pythagoras sats ska kunna användas direkt.", ["high"]),
        q("Sant eller falskt?", "Figurens vridning ändrar vilken sida som är hypotenusa", ["Sant", "Falskt"], 1, "Sidan mitt emot den räta vinkeln är hypotenusan oavsett hur bilden är vriden.", ["high"]),
      ],
    },
  },
  negativeLanguage: {
    title: "Förstå negativa tal",
    description: "Beskriv ordning, motsatta tal och subtraktion.",
    levels: ["high"],
    languageFocused: true,
    walkthrough: [
      ["På var sin sida", "Noll är gränsen", "Negativa tal ligger till vänster om noll på en vanlig tallinje. Positiva tal ligger till höger.", "Noll är varken positivt eller negativt. Tal längre åt höger är större."],
      ["Samma avstånd", "Motsatta tal", "Motsatta tal ligger lika långt från noll på var sin sida. Deras summa är noll.", "Det motsatta talet till ett positivt tal är negativt. Noll är sitt eget motsatta tal."],
      ["Två roller för minus", "Tecken och räknesätt", "Ett minustecken kan visa att ett tal är negativt. Det kan också stå för räknesättet subtraktion.", "Att subtrahera ett tal är samma sak som att addera dess motsatta tal."],
    ],
    modes: {
      graphic: [
        q("Vilket markerat tal är störst?", "Jämför punkternas lägen", ["A", "B", "De är lika stora"], 1, "B ligger längre åt höger på tallinjen och är därför större.", ["high"], {"type": "numberLine", "min": -3, "max": 3, "points": [{"value": -2, "label": "A"}, {"value": 1, "label": "B"}], "alt": "Tallinje från minus tre till tre. A ligger vid -2, B ligger vid 1"}),
        q("Vad har de markerade talen gemensamt?", "Jämför med noll", ["Båda är positiva", "De är lika stora", "De är motsatta tal"], 2, "De ligger lika långt från noll på var sin sida.", ["high"], {"type": "numberLine", "min": -3, "max": 3, "points": [{"value": -2, "label": "A"}, {"value": 2, "label": "B"}], "alt": "Tallinje från minus tre till tre. A ligger vid -2, B ligger vid 2"}),
        q("Vilken förändring visar pilen?", "Från start till slut", ["Värdet minskar", "Värdet ökar", "Värdet är oförändrat"], 0, "Pilen går åt vänster, mot mindre tal.", ["high"], {"type": "numberLine", "min": -3, "max": 3, "points": [], "alt": "Tallinje från minus tre till tre. . Pilen går från 1 till -2", "arrow": {"from": 1, "to": -2}}),
        q("Vilket tecken har talet vid A?", "Punktens läge", ["Positivt", "Negativt", "Varken positivt eller negativt"], 1, "A ligger till vänster om noll och markerar ett negativt tal.", ["high"], {"type": "numberLine", "min": -3, "max": 3, "points": [{"value": -1, "label": "A"}], "alt": "Tallinje från minus tre till tre. A ligger vid -1"}),
      ],
      rules: [
        q("Vilket ord passar?", "Ett tal till vänster om noll", ["Negativt", "Positivt", "Alltid noll"], 0, "På en vanlig tallinje ligger de negativa talen till vänster om noll.", ["high"]),
        q("Vilken beskrivning stämmer?", "Talet noll", ["Är både positivt och negativt", "Är varken positivt eller negativt", "Är alltid negativt"], 1, "Noll är gränsen mellan positiva och negativa tal.", ["high"]),
        q("Vad betyder motsatta tal?", "Två tal på tallinjen", ["Två tal bredvid varandra", "Två tal med samma tecken", "Samma avstånd från noll, olika sidor"], 2, "Motsatta tal har samma avstånd till noll och ligger på var sin sida, utom noll självt.", ["high"]),
        q("Vad kan minustecknet visa?", "Tecknets olika roller", ["Negativt tal eller subtraktion", "Enbart subtraktion", "Enbart negativa tal"], 0, "Sammanhanget visar om minus anger ett negativt tal eller ett räknesätt.", ["high"]),
      ],
      methods: [
        q("Hur hittar du det större talet?", "Två negativa tal på tallinjen", ["Välj det längst till vänster", "Välj det längst till höger", "Välj det längst från noll"], 1, "Det större talet ligger till höger, även när båda talen är negativa.", ["high"]),
        q("Hur hittar du ett motsatt tal?", "Utgå från ett tal som inte är noll", ["Flytta alltid ett steg åt höger", "Behåll både plats och tecken", "Byt sida men behåll avståndet till noll"], 2, "Motsatta tal ligger lika långt från noll på olika sidor.", ["high"]),
        q("Hur kan du skriva om subtraktion?", "Subtrahera ett negativt tal", ["Addera det motsatta positiva talet", "Addera samma negativa tal", "Byt tecken på alla tal"], 0, "Att subtrahera ett negativt tal är att addera dess motsatta, positiva tal.", ["high"]),
        q("Åt vilket håll förändras värdet?", "Addera ett negativt tal", ["Åt höger på tallinjen", "Åt vänster på tallinjen", "Värdet ändras aldrig"], 1, "Att addera ett negativt tal minskar värdet, så du rör dig åt vänster.", ["high"]),
      ],
      truefalse: [
        q("Sant eller falskt?", "Ett negativt tal kan vara större än ett annat negativt tal", ["Sant", "Falskt"], 0, "Negativa tal har också en storleksordning. Talet längre åt höger är större.", ["high"]),
        q("Sant eller falskt?", "Större avstånd från noll betyder alltid ett större tal", ["Sant", "Falskt"], 1, "Bland negativa tal ligger det tal som är längre från noll längre åt vänster och är mindre.", ["high"]),
        q("Sant eller falskt?", "Motsatta tal har summan noll", ["Sant", "Falskt"], 0, "Talen tar ut varandra när de adderas.", ["high"]),
        q("Sant eller falskt?", "Att subtrahera ett negativt tal minskar alltid värdet", ["Sant", "Falskt"], 1, "Du adderar då det motsatta positiva talet, vilket ökar värdet.", ["high"]),
      ],
    },
  },
  scaleLanguage: {
    title: "Förstå skala och symmetri",
    description: "Tolka avbildningar, förstoring och spegling.",
    levels: ["high"],
    languageFocused: true,
    walkthrough: [
      ["Bild och verklighet", "Skala jämför längder", "En skala jämför en längd i bilden med motsvarande längd i verkligheten. Använd samma enhet.", "Första talet står för bilden. Andra talet står för verkligheten."],
      ["Större eller mindre bild", "Förstoring och förminskning", "Vid förstoring är bildens längder större. Vid förminskning är de mindre än verklighetens.", "I en skalenlig bild ändras alla motsvarande längder med samma faktor."],
      ["Spegla eller vrid", "Symmetri", "Vid spegelsymmetri kan figuren delas så att sidorna är varandras spegelbilder.", "Rotationssymmetri innebär att figuren passar på sig själv efter en vridning som är mindre än ett helt varv och större än noll."],
    ],
    modes: {
      rules: [
        q("Vad jämför en skala?", "Bild och verklighet", ["Motsvarande längder", "Bara figurernas färger", "Bara antalet hörn"], 0, "En längdskala beskriver förhållandet mellan motsvarande längder.", ["high"]),
        q("Vad står första talet för?", "Skalans ordning", ["Verkligheten", "Bilden", "Alltid en area"], 1, "Skala skrivs i ordningen bild till verklighet.", ["high"]),
        q("Vad innebär förminskning?", "En skalenlig avbildning", ["Bilden har fler hörn", "Bilden är lika lång som verkligheten", "Bildens längder är mindre"], 2, "Vid förminskning är bildens längder mindre än motsvarande verkliga längder.", ["high"]),
        q("Vad är en symmetrilinje?", "Spegelsymmetri", ["En linje som delar figuren i spegelbilder", "Varje linje genom figuren", "En linje som visar längdskalan"], 0, "Delarna på var sin sida om en symmetrilinje är spegelbilder av varandra.", ["high"]),
      ],
      methods: [
        q("Vad kontrollerar du före jämförelsen?", "Bildlängd och verklig längd", ["Att de har samma färg", "Att längderna har samma enhet", "Att verkligheten alltid är störst"], 1, "Omvandla till samma enhet innan du jämför längderna i en skala.", ["high"]),
        q("Hur bevarar du formen?", "Rita en skalenlig förstoring", ["Förläng bara den längsta sidan", "Öka alla längder med samma antal centimeter", "Multiplicera alla längder med samma faktor"], 2, "Samma faktor bevarar längdernas proportioner och därmed formen.", ["high"]),
        q("Hur testar du spegelsymmetri?", "En tänkt vikning", ["Se om delarna täcker varandra", "Jämför bara delarnas färg", "Räkna enbart hörnen"], 0, "Om delarna sammanfaller vid vikning längs linjen är de spegelbilder.", ["high"]),
        q("Hur testar du rotationssymmetri?", "Vridning mindre än ett helt varv", ["Flytta figuren åt sidan", "Se om figuren passar på sig själv", "Förstora figuren samtidigt"], 1, "Figuren ska sammanfalla med sitt ursprungliga läge efter vridningen.", ["high"]),
      ],
      truefalse: [
        q("Sant eller falskt?", "En skala kan beskriva en förstoring", ["Sant", "Falskt"], 0, "Bilden kan vara större än verkligheten, till exempel en avbildning av en liten insekt.", ["high"]),
        q("Sant eller falskt?", "Verkligheten är alltid större än bilden", ["Sant", "Falskt"], 1, "Vid förstoring är bildens motsvarande längder större.", ["high"]),
        q("Sant eller falskt?", "Alla linjer genom mitten är symmetrilinjer", ["Sant", "Falskt"], 1, "Linjen måste dela figuren i spegelbilder. Att gå genom mitten räcker inte.", ["high"]),
        q("Sant eller falskt?", "En skalenlig förstoring bevarar längdernas proportioner", ["Sant", "Falskt"], 0, "Alla motsvarande längder multipliceras med samma faktor.", ["high"]),
      ],
    },
  },
  replacementLanguage: {
    title: "Sannolikhet med återläggning",
    description: "Förstå hur flera slumpmässiga drag hänger ihop.",
    levels: ["high"],
    languageFocused: true,
    walkthrough: [
      ["Lägg tillbaka eller behåll", "Återläggning", "Vid dragning med återläggning läggs föremålet tillbaka innan nästa drag. Sedan blandas innehållet igen.", "Utan återläggning är det dragna föremålet borta när du drar nästa gång."],
      ["Se vad som ändras", "Nästa drag", "Utan återläggning minskar antalet föremål. Fördelningen kan också ändras beroende på vad som drogs.", "Kontrollera både hur många föremål som finns kvar och hur många som ger det önskade utfallet."],
      ["Ordna möjliga vägar", "Träddiagram", "Ett träddiagram visar möjliga utfall steg för steg. En väg genom trädet beskriver en följd av utfall.", "Vid varje förgrening använder du sannolikheterna som gäller just där. Alla möjliga grenar från samma punkt har tillsammans sannolikheten ett."],
    ],
    modes: {
      rules: [
        q("Vad betyder återläggning?", "Flera drag ur en påse", ["Föremålet läggs tillbaka före nästa drag", "Alla föremål tas bort", "Bara det sista draget räknas"], 0, "Det dragna föremålet läggs tillbaka och innehållet blandas inför nästa drag.", ["high"]),
        q("Vad betyder utan återläggning?", "Efter ett drag", ["Påsen fylls med nya föremål", "Det dragna föremålet hålls utanför", "Föremålet måste dras igen"], 1, "Det föremål som drogs finns inte kvar i påsen inför nästa drag.", ["high"]),
        q("Vad beskriver en väg i trädet?", "Ett träddiagram", ["Bara hur påsen ser ut", "Alla utfall samtidigt", "En följd av möjliga utfall"], 2, "En väg visar vad som kan hända vid det första, andra och följande steget.", ["high"]),
        q("Vad är ett gynnsamt utfall?", "Det du undersöker", ["Ett utfall som uppfyller villkoret", "Alltid det vanligaste utfallet", "Det utfall som kom senast"], 0, "Gynnsamt betyder att utfallet stämmer med det du vill undersöka.", ["high"]),
      ],
      methods: [
        q("Vad kontrollerar du före nästa drag?", "Dragning utan återläggning", ["Bara påsens färg", "Vad som finns kvar i påsen", "Bara vilket utfall du önskar"], 1, "Räkna återstående föremål och vilka av dem som ger ett gynnsamt utfall.", ["high"]),
        q("Vad behövs för samma förutsättningar?", "Ett nytt slumpmässigt drag", ["Behåll föremålet utanför", "Lägg till en annan sorts föremål", "Lägg tillbaka och blanda igen"], 2, "Återläggning återställer innehållet. Blandning och likvärdig dragning ger samma förutsättningar.", ["high"]),
        q("Hur bygger du trädet vidare?", "Efter det första draget", ["Rita nästa möjliga utfall från varje gren", "Rita bara det utfall du hoppas på", "Ta bort alla tidigare grenar"], 0, "Från varje första utfall behöver du visa vilka utfall som sedan är möjliga.", ["high"]),
        q("Vilken uppgift behöver du?", "Chans för röd efter ett drag", ["Bara det ursprungliga antalet röda", "Om föremålet lades tillbaka", "Vilket utfall du tycker bäst om"], 1, "Återläggningen avgör vilket innehåll nästa drag görs ur. Utan återläggning behöver du även veta vad som drogs.", ["high"]),
      ],
      truefalse: [
        q("Sant eller falskt?", "Utan återläggning finns färre föremål kvar efter ett drag", ["Sant", "Falskt"], 0, "Ett föremål har tagits bort ur påsen.", ["high"]),
        q("Sant eller falskt?", "Man kan alltid använda första dragets sannolikheter igen", ["Sant", "Falskt"], 1, "Utan återläggning kan fördelningen ha ändrats. Undersök det nya innehållet.", ["high"]),
        q("Sant eller falskt?", "Återläggning garanterar samma utfall vid nästa drag", ["Sant", "Falskt"], 1, "Samma förutsättningar betyder samma sannolikheter, inte ett garanterat utfall.", ["high"]),
        q("Sant eller falskt?", "Ett träddiagram hjälper dig hålla reda på flera steg", ["Sant", "Falskt"], 0, "Grenarna ordnar möjliga följder så att du kan följa vad som händer steg för steg.", ["high"]),
      ],
    },
  },
  expressionLanguage: {
    title: "Variabler och uttryck",
    description: "Förstå bokstäver, termer och förenkling.",
    levels: ["high"],
    languageFocused: true,
    walkthrough: [
      ["En bokstav för ett tal", "Variabel", "En variabel kan stå för ett tal. Vilket tal den står för beror på sammanhanget.", "I samma beräkning står samma variabel för samma värde, om inget annat anges."],
      ["Beskriv med matematik", "Uttryck och ekvation", "Ett uttryck kan innehålla tal, variabler och räknesätt. En ekvation säger att två uttryck har samma värde.", "Ett uttryck behöver inget likhetstecken. En ekvation innehåller ett likhetstecken."],
      ["Skriv enklare", "Termer av samma slag", "Vid förenkling kan du slå ihop termer med samma variabeldel. Siffertermer samlas för sig.", "Termer med olika variabeldelar kan inte slås ihop till en enda likadan term."],
    ],
    modes: {
      rules: [
        q("Vad är en variabel?", "En bokstav i matematiken", ["En symbol som kan stå för ett tal", "Ett tecken som alltid betyder noll", "En enhet för längd"], 0, "Variabeln representerar ett tal vars värde beror på sammanhanget.", ["high"]),
        q("Vad beskriver ett uttryck?", "Tal, bokstäver och räknesätt", ["Alltid två lika stora sidor", "En matematisk kombination", "Alltid ett färdigt svar"], 1, "Ett uttryck kombinerar tal eller variabler med räknesätt.", ["high"]),
        q("Vad kännetecknar en ekvation?", "Jämför med ett uttryck", ["Den får inte ha variabler", "Den har alltid bara ett tal", "Den anger likhet mellan uttryck"], 2, "En ekvation anger med ett likhetstecken att två uttryck har samma värde.", ["high"]),
        q("Vad betyder att förenkla?", "Skriv om ett uttryck", ["Skriv enklare med samma värde", "Välj ett mindre svar", "Ta bort alla bokstäver"], 0, "Förenklingen ska bevara uttryckets värde för de variabelvärden som är tillåtna.", ["high"]),
      ],
      methods: [
        q("Vilka termer kan samlas?", "Förenkla genom att slå ihop termer", ["Alla termer med samma tecken", "Termer med samma variabeldel", "Alla termer med olika bokstäver"], 1, "Variabeldelen behöver vara densamma. Siffertermer kan samlas för sig.", ["high"]),
        q("Vad gör du när variabelns värde är känt?", "Beräkna uttryckets värde", ["Tar bort variabeln", "Ändrar bara första förekomsten", "Ersätter varje förekomst med värdet"], 2, "Sätt in samma givna värde överallt där variabeln förekommer och följ räkneordningen.", ["high"]),
        q("Hur börjar du översätta en text?", "Skriv ett uttryck för en kostnad", ["Bestäm vad variabeln står för", "Välj en bokstav utan betydelse", "Skriv alltid ett likhetstecken först"], 0, "Ange vad variabeln betyder så att uttrycket kan kopplas till situationen.", ["high"]),
        q("Vad gör du med olika variabeldelar?", "De kan inte samlas direkt", ["Raderar den ena termen", "Låter dem stå som skilda termer", "Byter alla bokstäver till samma"], 1, "Olika variabeldelar representerar olika slags termer och kan inte samlas på det sättet.", ["high"]),
      ],
      truefalse: [
        q("Sant eller falskt?", "Samma variabel får byta värde mitt i samma beräkning", ["Sant", "Falskt"], 1, "Samma variabel ska stå för samma värde i beräkningen, om inget annat anges.", ["high"]),
        q("Sant eller falskt?", "Ett uttryck måste innehålla ett likhetstecken", ["Sant", "Falskt"], 1, "Det är ekvationen som anger en likhet. Ett uttryck behöver inget likhetstecken.", ["high"]),
        q("Sant eller falskt?", "Siffertermer kan samlas för sig vid förenkling", ["Sant", "Falskt"], 0, "Tal utan variabeldel kan adderas eller subtraheras med varandra.", ["high"]),
        q("Sant eller falskt?", "En förenkling ska bevara uttryckets värde", ["Sant", "Falskt"], 0, "Du ändrar skrivsättet, inte vad uttrycket är värt.", ["high"]),
      ],
    },
  },
  placeValueLanguage: {
    title: "Positionssystemet",
    description: "Skilj på siffra och tal och förstå platsvärde.",
    levels: ["high"],
    languageFocused: true,
    walkthrough: [
      ["Siffror bygger tal", "Siffra och tal", "En siffra är ett skrivtecken. Ett tal kan skrivas med en eller flera siffror.", "Även ett ensiffrigt tal är ett tal. Noll är både en siffra och ett tal."],
      ["Platsen ger värdet", "Ental, tiotal, hundratal", "Samma siffra får olika värde beroende på vilken talsort den står i.", "Ett tiotal är tio ental. Ett hundratal är tio tiotal."],
      ["Delar av en hel", "Tiondelar och hundradelar", "Till höger om decimaltecknet finns tiondelar, hundradelar och mindre delar.", "Tio hundradelar är en tiondel. Jämför samma talsort när du jämför tal."],
    ],
    modes: {
      rules: [
        q("Vilket ord passar?", "Ett skrivtecken i ett tal", ["Siffra", "Talsort", "Summa"], 0, "Siffror är skrivtecken som används för att skriva tal.", ["high"]),
        q("Vad betyder positionssystem?", "Siffrans plats", ["Platsen saknar betydelse", "Platsen påverkar siffrans värde", "Alla siffror betyder ental"], 1, "Samma siffra representerar olika värden på olika positioner.", ["high"]),
        q("Vilken talsort kommer först?", "Direkt till höger om decimaltecknet", ["Tiotal", "Hundradelar", "Tiondelar"], 2, "Tiondelarna står närmast decimaltecknet på höger sida.", ["high"]),
        q("Vad skiljer begreppen?", "Siffra och tal", ["Tal kan skrivas med siffror", "Tal måste ha flera siffror", "Siffror är alltid större än tal"], 0, "Ett tal kan skrivas med en eller flera siffror. Siffra och tal beskriver olika saker.", ["high"]),
      ],
      methods: [
        q("Hur jämför du positiva decimaltal?", "Börja med samma talsort", ["Räkna antalet decimaler", "Jämför största talsorten först", "Börja med sista decimalen"], 1, "Jämför från den största talsorten. Vid lika värden går du vidare åt höger.", ["high"]),
        q("Vad gör du om heltalsdelarna är lika?", "Jämför två positiva decimaltal", ["Välj talet med flest siffror", "Sluta jämföra", "Jämför tiondelarna"], 2, "Jämför först tiondelarna, sedan hundradelarna om tiondelarna också är lika.", ["high"]),
        q("Varför kan en nolla behövas?", "Ingen mängd av en viss talsort", ["För att bevara övriga siffrors plats", "För att alltid göra talet större", "För att visa att talet är negativt"], 0, "Nollan kan hålla en position så att andra siffror får rätt platsvärde.", ["high"]),
        q("Hur växlar du mellan talsorter?", "Tio hundradelar", ["Blir ett hundratal", "Blir en tiondel", "Blir tio ental"], 1, "Tio delar av en talsort motsvarar en del av talsorten närmast till vänster.", ["high"]),
      ],
      truefalse: [
        q("Sant eller falskt?", "Ett tal kan skrivas med en enda siffra", ["Sant", "Falskt"], 0, "Ett ensiffrigt tal är också ett tal.", ["high"]),
        q("Sant eller falskt?", "Hundradelar är större än tiondelar", ["Sant", "Falskt"], 1, "En hundradel är mindre än en tiondel. Tio hundradelar är en tiondel.", ["high"]),
        q("Sant eller falskt?", "Fler decimaler betyder alltid ett större tal", ["Sant", "Falskt"], 1, "Det är siffrornas platsvärden som avgör storleken, inte antalet decimaler.", ["high"]),
        q("Sant eller falskt?", "Decimaltecknet skiljer ental från tiondelar", ["Sant", "Falskt"], 0, "Entalen står direkt till vänster och tiondelarna direkt till höger om decimaltecknet.", ["high"]),
      ],
    },
  },
  roundingLanguage: {
    title: "Avrundning och överslag",
    description: "Förstå närmevärden och hur du väljer noggrannhet.",
    levels: ["high"],
    languageFocused: true,
    walkthrough: [
      ["Ungefärligt värde", "Närmevärde", "Ett närmevärde ligger nära det exakta värdet. Avrundning är ett sätt att få ett närmevärde.", "Tecknet ungefär lika med visar att värdena inte behöver vara exakt lika."],
      ["Välj talsort", "Titta ett steg åt höger", "Vid vanlig avrundning av positiva tal tittar du på siffran direkt till höger om den valda positionen.", "Noll till fyra: behåll siffran. Fem till nio: höj den. En nia kan ge en övergång."],
      ["Kontrollera storleken", "Överslagsräkning", "Byt till närliggande, lättare tal och gör en ungefärlig beräkning.", "Överslaget hjälper dig att bedöma om ditt svar är rimligt. Det ersätter inte alltid en exakt beräkning."],
    ],
    modes: {
      rules: [
        q("Vad betyder närmevärde?", "Ungefärligt värde", ["Ett värde nära det exakta", "Ett värde som alltid är större", "Ett helt annat värde"], 0, "Ett närmevärde är en approximation av det exakta värdet.", ["high"]),
        q("Vilken talsort gäller?", "Avrunda till en decimal", ["Ental", "Tiondelar", "Hundradelar"], 1, "Den första decimalen står på tiondelsplatsen.", ["high"]),
        q("Vad betyder tecknet?", "≈", ["Exakt lika med", "Större än", "Ungefär lika med"], 2, "Tecknet läses ungefär lika med och används bland annat vid avrundning.", ["high"]),
        q("Vad menas med överslagsräkning?", "En snabb uppskattning", ["Räkna ungefär med enklare tal", "Räkna utan någon metod", "Skriva fler decimaler"], 0, "Du använder närliggande tal som är enklare att räkna med.", ["high"]),
      ],
      methods: [
        q("Vad gör du först?", "En uppgift ber dig avrunda", ["Tar bort alla nollor", "Bestämmer vilken position som gäller", "Höjer alltid sista siffran"], 1, "Börja med att se vilken talsort eller hur många decimaler uppgiften anger.", ["high"]),
        q("Vilken siffra avgör?", "Avrunda ett positivt tal", ["Den första siffran i talet", "Siffran direkt till vänster", "Siffran direkt till höger"], 2, "Titta direkt till höger om positionen du avrundar till.", ["high"]),
        q("Vad gör du när nästa siffra är noll?", "Vanlig avrundning av positiva tal", ["Behåller siffran på vald position", "Höjer siffran på vald position", "Tar bort hela heltalsdelen"], 0, "Noll ingår i gruppen noll till fyra: siffran på vald position behålls.", ["high"]),
        q("Vad hjälper ett överslag dig med?", "Kontroll av ett svar", ["Att bevisa varje decimal", "Att bedöma svarets storlek", "Att slippa läsa frågan"], 1, "Om ditt svar ligger långt från överslaget bör du kontrollera beräkningen.", ["high"]),
      ],
      truefalse: [
        q("Sant eller falskt?", "Ett avrundat värde är alltid större än originalet", ["Sant", "Falskt"], 1, "Avrundning kan ge ett lägre eller högre värde, eller lämna värdet oförändrat.", ["high"]),
        q("Sant eller falskt?", "Avrundning till heltal lämnar inga decimaler", ["Sant", "Falskt"], 0, "Avrundning till heltal innebär att du avrundar till entalsplatsen.", ["high"]),
        q("Sant eller falskt?", "Ett överslag ger alltid det exakta svaret", ["Sant", "Falskt"], 1, "Ett överslag är en uppskattning. Det behöver inte sammanfalla med det exakta svaret.", ["high"]),
        q("Sant eller falskt?", "Vald noggrannhet påverkar avrundningen", ["Sant", "Falskt"], 0, "Att avrunda till tiondelar och till tiotal innebär olika noggrannhet.", ["high"]),
      ],
    },
  },
  angleLanguage: {
    title: "Vinklarnas språk",
    description: "Känn igen vinkeltyper och beskriv en vridning.",
    levels: ["high"],
    languageFocused: true,
    walkthrough: [
      ["Vinkelns delar", "Vinkelspets och vinkelben", "Två strålar med samma startpunkt bildar en vinkel. Startpunkten är vinkelspetsen.", "Strålarna kallas vinkelben. Vinkelns storlek beror på öppningen mellan dem.", {"type": "angle", "degrees": 45, "alt": "Två vinkelben med en öppning på 45 grader."}],
      ["Jämför med ett hörn", "Spetsig, rät och trubbig", "En rät vinkel motsvarar ett kvarts varv. En spetsig är mindre; en trubbig är större men mindre än ett halvt varv.", "En spetsig vinkel är större än noll. En liten fyrkant vid spetsen markerar en rät vinkel."],
      ["Mät öppningen", "Grader och gradskiva", "Lägg gradskivans centrum på vinkelspetsen och dess nolllinje längs ett vinkelben.", "Läs den skala som börjar på noll vid det vinkelbenet. Följ den till det andra vinkelbenet."],
    ],
    modes: {
      graphic: [
        q("Vilken sorts vinkel ser du?", "Titta på öppningen", ["Rät", "Trubbig", "Spetsig"], 2, "Öppningen är större än noll men mindre än en rät vinkel.", ["high"], {"type": "angle", "degrees": 45, "alt": "Två vinkelben med en öppning på 45 grader."}),
        q("Vad visar markeringen?", "Den lilla fyrkanten", ["En rät vinkel", "Lika långa vinkelben", "En hel cirkel"], 0, "Den lilla fyrkanten visar att vinkeln är rät.", ["high"], {"type": "angle", "degrees": 90, "alt": "Två vinkelben med en öppning på 90 grader. En liten fyrkant finns vid spetsen."}),
        q("Vilken sorts vinkel ser du?", "Jämför med ett kvarts varv", ["Spetsig", "Trubbig", "Rak"], 1, "Öppningen är större än ett kvarts varv men mindre än ett halvt.", ["high"], {"type": "angle", "degrees": 125, "alt": "Två vinkelben med en öppning på 125 grader."}),
        q("Vilken vridning motsvarar vinkeln?", "Jämför med ett helt varv", ["Ett helt varv", "Ett halvt varv", "Ett kvarts varv"], 2, "En rät vinkel motsvarar ett kvarts varv.", ["high"], {"type": "angle", "degrees": 90, "alt": "Två vinkelben med en öppning på 90 grader. En liten fyrkant finns vid spetsen."}),
      ],
      rules: [
        q("Vad kallas mötespunkten?", "Vinkelbenens gemensamma start", ["Vinkelspets", "Vinkelsumma", "Omkrets"], 0, "Den gemensamma startpunkten kallas vinkelspets.", ["high"]),
        q("Vilken vinkel beskrivs?", "Större än noll men mindre än en rät", ["Trubbig", "Spetsig", "Rak"], 1, "En spetsig vinkel är mindre än en rät vinkel och större än noll.", ["high"]),
        q("Vilken vinkel beskrivs?", "Större än rät, mindre än rak", ["Spetsig", "Rät", "Trubbig"], 2, "En trubbig vinkel ligger mellan en rät vinkel och ett halvt varv.", ["high"]),
        q("Vad visar den lilla fyrkanten?", "En markering vid vinkelspetsen", ["Att vinkeln är rät", "Att benen är lika långa", "Att figuren är en kvadrat"], 0, "Den lilla fyrkanten markerar en rät vinkel, inte en viss längd på benen.", ["high"], {"type": "angle", "degrees": 90, "alt": "Två vinkelben med en öppning på 90 grader. En liten fyrkant finns vid spetsen."}),
      ],
      methods: [
        q("Vad ska du jämföra?", "Vilken vinkel är störst?", ["Hur långa benen är ritade", "Hur stor öppningen är", "Vilken figur som är störst"], 1, "Vinkelstorleken avgörs av öppningen, inte av de ritade benens längd.", ["high"]),
        q("Var lägger du gradskivans centrum?", "Börja mäta en vinkel", ["Vid slutet av ett ben", "Mitt mellan benen", "På vinkelspetsen"], 2, "Centrum ska ligga på spetsen och nolllinjen längs ett vinkelben.", ["high"]),
        q("Vilken skala läser du?", "Gradskivan har två skalor", ["Den som börjar på noll vid benet", "Alltid den yttre skalan", "Den som ger störst värde"], 0, "Utgå från noll vid det vinkelben som ligger längs nolllinjen.", ["high"]),
        q("Vad betyder vinkelsumma?", "En triangels vinkelsumma", ["Den största vinkeln", "Alla tre vinklarna tillsammans", "Summan av sidornas längder"], 1, "Vinkelsumma är summan av vinklarna. Sidornas sammanlagda längd är omkretsen.", ["high"]),
      ],
      truefalse: [
        q("Sant eller falskt?", "Längre ritade vinkelben ger alltid större vinkel", ["Sant", "Falskt"], 1, "Att förlänga benen utan att ändra deras riktning ändrar inte vinkeln.", ["high"]),
        q("Sant eller falskt?", "En rät vinkel är ett kvarts varv", ["Sant", "Falskt"], 0, "Ett kvarts varv motsvarar en rät vinkel.", ["high"]),
        q("Sant eller falskt?", "En rak vinkel och en rät vinkel är samma sak", ["Sant", "Falskt"], 1, "En rak vinkel är ett halvt varv. En rät vinkel är ett kvarts varv.", ["high"]),
        q("Sant eller falskt?", "En spetsig vinkel är mindre än en rät vinkel", ["Sant", "Falskt"], 0, "En spetsig vinkel ligger mellan noll och en rät vinkel.", ["high"]),
      ],
    },
  },
  fractionLanguage: {
    title: "Förstå bråk",
    description: "Beskriv delar av en helhet och bråk med samma värde.",
    levels: ["high"],
    languageFocused: true,
    walkthrough: [
      ["Börja med helheten", "Lika stora delar", "När ett bråk beskriver en del av en figur behöver du veta vad som är hela figuren. Dela helheten i lika stora delar.", "Att bara räkna bitar fungerar inte om bitarna har olika storlek."],
      ["Läs delarnas namn", "Täljare och nämnare", "Nämnaren anger hur många lika stora delar helheten delas i. Täljaren anger hur många sådana delar bråket avser.", "Bråkstrecket betyder division. Bråk kan också beskriva mer än en hel."],
      ["Samma värde, ny form", "Förkorta och förlänga", "Dividera eller multiplicera täljare och nämnare med samma positiva heltal. Värdet bevaras.", "Vid förkortning väljer du en gemensam delare så att täljare och nämnare fortfarande är heltal.", {"type": "fraction", "rows": [{"parts": 2, "filled": 1, "label": "1/2"}, {"parts": 4, "filled": 2, "label": "2/4"}], "alt": "En halv och två fjärdedelar visar lika stor markerad andel."}],
    ],
    modes: {
      graphic: [
        q("Vilken del är markerad?", "En hel rektangel", ["En fjärdedel", "Tre fjärdedelar", "Tre halvor"], 1, "Tre av fyra lika stora delar är markerade: tre fjärdedelar.", ["high"], {"type": "fraction", "rows": [{"parts": 4, "filled": 3}], "alt": "En rektangel delad i 4 lika stora delar. 3 delar är blå och markerade med prickar."}),
        q("Vilken regel syns?", "Två lika stora helheter", ["Fler delar ger större bråkvärde", "Bara färgen avgör värdet", "Olika bråk kan ha samma värde"], 2, "Den markerade delen är lika stor: en halv och två fjärdedelar.", ["high"], {"type": "fraction", "rows": [{"parts": 2, "filled": 1, "label": "1/2"}, {"parts": 4, "filled": 2, "label": "2/4"}], "alt": "Två lika långa rektanglar. En av två delar är markerad i den övre och två av fyra i den nedre."}),
        q("Vad visar nämnaren här?", "Bråket av hela figuren", ["Sex lika stora delar", "Två markerade delar", "Fyra omarkerade delar"], 0, "Nämnaren anger hur många lika stora delar helheten är delad i.", ["high"], {"type": "fraction", "rows": [{"parts": 6, "filled": 2}], "alt": "En rektangel delad i 6 lika stora delar. 2 delar är blå och markerade med prickar."}),
        q("Hur mycket är markerat?", "Jämför med en halv", ["Mindre än hälften", "Precis hälften", "Mer än hälften"], 0, "Två av sex lika stora delar är mindre än tre av sex, som är hälften.", ["high"], {"type": "fraction", "rows": [{"parts": 6, "filled": 2}], "alt": "En rektangel delad i 6 lika stora delar. 2 delar är blå och markerade med prickar."}),
      ],
      rules: [
        q("Vad berättar nämnaren?", "Ett bråk av en helhet", ["Hur många lika delar helheten delas i", "Hur många delar som är markerade", "Hur stor hela figuren är i centimeter"], 0, "Nämnaren anger indelningen av helheten i lika stora delar.", ["high"], {"type": "fraction", "rows": [{"parts": 4, "filled": 3}], "alt": "En rektangel delad i 4 lika stora delar. 3 delar är blå och markerade med prickar."}),
        q("Vad berättar täljaren?", "Ett bråk av en helhet", ["Antalet delar i varje helhet", "Hur många delar bråket avser", "Att delarna alltid är olika stora"], 1, "Täljaren anger antalet delar av den storlek som nämnaren beskriver.", ["high"]),
        q("Vad betyder bråkstrecket?", "Täljare över nämnare", ["Addition", "Multiplikation", "Division"], 2, "Ett bråk kan läsas som täljaren dividerad med nämnaren.", ["high"]),
        q("Vilket begrepp passar?", "Samma bråkvärde med större heltal", ["Förlängning", "Avrundning", "Subtraktion"], 0, "Vid förlängning multipliceras både täljare och nämnare med samma positiva heltal större än ett.", ["high"]),
      ],
      methods: [
        q("Vad måste du kontrollera först?", "Läs ett bråk genom att räkna bitar", ["Att alla bitar har samma färg", "Att delarna är lika stora", "Att täljaren är större"], 1, "När du räknar bitar måste varje bit representera lika stor del av helheten.", ["high"]),
        q("Hur förkortar du ett bråk?", "Bevara värdet", ["Subtraherar samma tal från båda", "Dividerar bara täljaren", "Dividerar båda med en gemensam delare"], 2, "Dividera både täljare och nämnare med samma gemensamma delare.", ["high"]),
        q("Hur jämför du positiva bråk med samma nämnare?", "Delarna är lika stora", ["Jämför täljarna", "Välj alltid det första bråket", "Jämför antalet siffror"], 0, "Samma nämnare betyder lika stora delar. Större täljare betyder fler sådana delar.", ["high"]),
        q("Varför söker du en gemensam nämnare?", "Addera bråk med olika nämnare", ["För att göra båda bråken större", "För att räkna delar av samma storlek", "För att ta bort alla täljare"], 1, "En gemensam nämnare gör delarna lika stora. Då kan du addera antalet delar.", ["high"]),
      ],
      truefalse: [
        q("Sant eller falskt?", "Förlängning gör alltid bråkets värde större", ["Sant", "Falskt"], 1, "Båda talen ändras med samma faktor, så bråkets värde bevaras.", ["high"]),
        q("Sant eller falskt?", "Ett bråk kan vara större än en hel", ["Sant", "Falskt"], 0, "Om täljaren är större än den positiva nämnaren är bråket större än en hel.", ["high"]),
        q("Sant eller falskt?", "Olika stora bitar kan alltid räknas som lika delar", ["Sant", "Falskt"], 1, "Du behöver först en indelning i lika stora delar för att skriva bråket genom att räkna bitar.", ["high"]),
        q("Sant eller falskt?", "Samma nämnare innebär samma sorts bråkdelar", ["Sant", "Falskt"], 0, "Nämnaren namnger delarnas storlek i förhållande till en hel.", ["high"]),
      ],
    },
  },
  dataLanguage: {
    title: "Tabeller och diagram",
    description: "Förstå frekvens, diagramval och hur du läser en skala.",
    levels: ["high"],
    languageFocused: true,
    walkthrough: [
      ["Samla och ordna", "Rader och kolumner", "En tabell ordnar information i rader och kolumner. Rubrikerna berättar vad uppgifterna betyder.", "En frekvenstabell visar hur många gånger ett värde eller en kategori förekommer."],
      ["Välj en bild av informationen", "Staplar, linjer och cirklar", "Staplar kan jämföra kategorier. Linjer kan visa förändring över tid. En cirkel kan visa delar av en helhet.", "Diagramtypen ska hjälpa läsaren att se det du vill undersöka."],
      ["Läs innan du jämför", "Rubrik, enhet och skala", "Kontrollera vad diagrammet visar, vilka enheter som används och vad markeringarna på axlarna betyder.", "Olika skalor kan få samma skillnad att se olika stor ut. Läs värdena, inte bara bilden."],
    ],
    modes: {
      graphic: [
  {
    "prompt": "Vad visar staplarnas höjd?",
    "example": "Elever röstade på A, B eller C",
    "choices": [
      "Antalet röster",
      "Bokstävernas storlek",
      "Stap­larnas bredd"
    ],
    "correct": 0,
    "explanation": "Höjden läses mot skalan och visar antalet röster.",
    "levels": [
      "high"
    ],
    "visual": {
      "type": "barChart",
      "values": [
        2,
        4,
        3
      ],
      "labels": [
        "A",
        "B",
        "C"
      ],
      "alt": "Stapeldiagram. Antal röster: A har 2, B har 4 och C har 3. Skalan börjar vid noll och går i steg om ett."
    }
  },
  {
    "prompt": "Vilket alternativ fick flest röster?",
    "example": "Jämför staplarnas höjd",
    "choices": [
      "A",
      "B",
      "C"
    ],
    "correct": 1,
    "explanation": "B:s stapel är högst och når till fyra röster.",
    "levels": [
      "high"
    ],
    "visual": {
      "type": "barChart",
      "values": [
        2,
        4,
        3
      ],
      "labels": [
        "A",
        "B",
        "C"
      ],
      "alt": "Stapeldiagram. Antal röster: A har 2, B har 4 och C har 3. Skalan börjar vid noll och går i steg om ett."
    }
  },
  {
    "prompt": "Vad bör du läsa innan du jämför?",
    "example": "Tolka diagrammet",
    "choices": [
      "Bara färgen",
      "Bara bredden",
      "Skalan och etiketterna"
    ],
    "correct": 2,
    "explanation": "Skalan visar antal. Etiketterna visar vilket alternativ varje stapel gäller.",
    "levels": [
      "high"
    ],
    "visual": {
      "type": "barChart",
      "values": [
        2,
        4,
        3
      ],
      "labels": [
        "A",
        "B",
        "C"
      ],
      "alt": "Stapeldiagram. Antal röster: A har 2, B har 4 och C har 3. Skalan börjar vid noll och går i steg om ett."
    }
  },
  {
    "prompt": "Vad betyder att A:s stapel når 2?",
    "example": "Antal röster",
    "choices": [
      "Två elever valde A",
      "A fick två procent",
      "A är dubbelt så bred"
    ],
    "correct": 0,
    "explanation": "Skalan anger antal röster, så höjden 2 betyder två röster.",
    "levels": [
      "high"
    ],
    "visual": {
      "type": "barChart",
      "values": [
        2,
        4,
        3
      ],
      "labels": [
        "A",
        "B",
        "C"
      ],
      "alt": "Stapeldiagram. Antal röster: A har 2, B har 4 och C har 3. Skalan börjar vid noll och går i steg om ett."
    }
  }
],
      rules: [
        q("Vad betyder frekvens?", "I en frekvenstabell", ["Antal gånger något förekommer", "Det största värdet", "Alla värdens medelvärde"], 0, "Frekvens är antalet förekomster av ett visst värde eller en kategori.", ["high"]),
        q("Vad visar kolumnrubriken?", "Läs en tabell", ["Att värdena måste vara störst", "Vad uppgifterna i kolumnen betyder", "Att alla rader har samma värde"], 1, "Rubriken talar om vad som står i kolumnen och kan även ange enheten.", ["high"]),
        q("Vilket diagram passar ofta?", "Förändring under en tidsperiod", ["Cirkeldiagram", "En lista utan ordning", "Linjediagram"], 2, "Ett linjediagram kan göra en förändring över tid tydlig.", ["high"]),
        q("Vilket diagram passar ofta?", "Hur en helhet är fördelad", ["Cirkeldiagram", "Tallinje", "Enbart en medelvärdesruta"], 0, "Cirkeln representerar helheten och sektorerna visar delarnas andelar.", ["high"]),
      ],
      methods: [
        q("Vad läser du först?", "Ett obekant diagram", ["Bara den högsta punkten", "Rubrik, axlar och enheter", "Bara färgerna"], 1, "Först behöver du veta vad diagrammet visar och hur värdena ska läsas.", ["high"]),
        q("Hur tar du reda på markeringarnas värde?", "Läs en axel", ["Antar att varje steg är ett", "Räknar bara strecken", "Undersöker de utskrivna skalvärdena"], 2, "De utskrivna värdena visar vad stegen betyder. Ett steg är inte alltid en enhet.", ["high"]),
        q("Vad kontrollerar du vid jämförelsen?", "Två diagram ser olika branta ut", ["Om skalorna är desamma", "Om rubrikerna har samma färg", "Om det finns lika många bokstäver"], 0, "Olika axelskalor kan ändra intrycket. Jämför värden och enheter.", ["high"]),
        q("Vad ska du summera?", "Antalet svar i en frekvenstabell", ["De olika kategoriernas namn", "Frekvenserna", "Bara den högsta frekvensen"], 1, "Varje frekvens anger hur många svar en kategori eller ett värde har. Summan ger totalantalet.", ["high"]),
      ],
      truefalse: [
        q("Sant eller falskt?", "Frekvens betyder alltid det uppmätta värdet", ["Sant", "Falskt"], 1, "Det uppmätta värdet och hur ofta det förekommer är olika uppgifter.", ["high"]),
        q("Sant eller falskt?", "En cirkel kan visa delar av en helhet", ["Sant", "Falskt"], 0, "Sektorerna i ett cirkeldiagram visar hur helheten är fördelad.", ["high"]),
        q("Sant eller falskt?", "Axelns markeringar måste alltid öka med ett", ["Sant", "Falskt"], 1, "Skalan kan ha andra steg. Kontrollera de angivna värdena.", ["high"]),
        q("Sant eller falskt?", "Samma data kan visas i både tabell och diagram", ["Sant", "Falskt"], 0, "En tabell och ett diagram kan presentera samma information på olika sätt.", ["high"]),
      ],
    },
  },
  problemLanguage: {
    title: "Läs och lös problem",
    description: "Välj information, planera steg och förklara din lösning.",
    levels: ["high"],
    languageFocused: true,
    walkthrough: [
      ["Förstå frågan", "Vad söker jag?", "Läs vad uppgiften ber om. Skilj mellan det som är känt och det du behöver ta reda på.", "All information i texten behöver inte användas. Välj det som hjälper dig besvara frågan."],
      ["Gör en plan", "Bild, tabell eller ekvation", "Välj ett sätt att visa sambandet. En skiss, tabell eller ekvation kan hjälpa dig att dela upp problemet.", "Om problemet känns svårt kan du prova ett enklare fall eller arbeta baklänges."],
      ["Visa och kontrollera", "Förklara varje steg", "Skriv vad du tar reda på i varje steg. Avsluta med ett svar som passar frågan och rätt enhet.", "Kontrollera både att beräkningen stämmer och att resultatet är rimligt i situationen."],
    ],
    modes: {
      rules: [
        q("Vad menas med relevant information?", "Läs en textuppgift", ["Information som behövs för lösningen", "Alla ord som är längst", "Enbart den första meningen"], 0, "Relevant information hjälper dig att besvara frågan.", ["high"]),
        q("Vad är ett delproblem?", "En lösning i flera steg", ["En annan uppgift utan samband", "En mindre del av det stora problemet", "Ett svar som inte ska användas"], 1, "Ett delproblem är ett steg som hjälper dig vidare mot huvudfrågans svar.", ["high"]),
        q("Vad menas med att redovisa?", "Visa din lösning", ["Skriva bara svaret", "Skriva av frågan", "Visa beräkningar och förklara stegen"], 2, "En redovisning visar hur du tänkte och hur stegen leder fram till svaret.", ["high"]),
        q("Vad är en rimlighetskontroll?", "Kan svaret stämma?", ["Bedöma svaret i sitt sammanhang", "Kontrollera enbart stavningen", "Välja det största möjliga svaret"], 0, "Jämför resultatet med situationen, en uppskattning och det som efterfrågas.", ["high"]),
      ],
      methods: [
        q("Vilken information behövs?", "Köp frukt till ett kilopris", ["Fruktens färg och namn", "Vikten och priset per kilo", "Butikens öppettider"], 1, "För att bestämma kostnaden utifrån ett kilopris behöver du vikten och priset per kilo.", ["high"]),
        q("Vad kan hjälpa dig se sambandet?", "Texten beskriver delar och en helhet", ["Välja ett räknesätt på måfå", "Använda alla tal direkt", "Rita en enkel skiss"], 2, "En skiss kan visa vilka delar som hör ihop och vad du söker.", ["high"]),
        q("Vad innebär att arbeta baklänges?", "Slutvärdet är känt", ["Utgå från slutet och ångra stegen", "Läsa varje ord bakifrån", "Byta plats på alla siffror"], 0, "Du utgår från slutet och använder motsatta steg för att hitta utgångsläget.", ["high"]),
        q("Vad bör ditt slutliga svar innehålla?", "En fråga om hur långt någon färdas", ["Bara en siffra utan förklaring", "Sträckan med en passande enhet", "En tid i minuter"], 1, "Svaret ska besvara frågan. En sträcka behöver en längdenhet.", ["high"]),
      ],
      truefalse: [
        q("Sant eller falskt?", "Alla tal i en textuppgift måste användas", ["Sant", "Falskt"], 1, "Vissa uppgifter innehåller information som inte behövs för att svara på frågan.", ["high"]),
        q("Sant eller falskt?", "En tabell kan hjälpa dig hitta ett mönster", ["Sant", "Falskt"], 0, "När du ordnar information systematiskt kan samband bli lättare att upptäcka.", ["high"]),
        q("Sant eller falskt?", "En korrekt beräkning garanterar att frågan är besvarad", ["Sant", "Falskt"], 1, "Du kan ha räknat rätt på fel sak. Kontrollera vad frågan faktiskt efterfrågar.", ["high"]),
        q("Sant eller falskt?", "Ett enklare exempel kan hjälpa med ett svårt problem", ["Sant", "Falskt"], 0, "Ett enklare fall kan visa en metod eller ett samband som du sedan använder i huvudproblemet.", ["high"]),
      ],
    },
  },
  operationLanguage: {
    animations: [
  {
    "id": "addition",
    "title": "Addition",
    "levels": [
      "high"
    ],
    "compact": false,
    "steps": [
      {
        "parts": [
          {
            "id": "first",
            "text": "4"
          }
        ],
        "text": "Vi börjar med en term, till exempel fyra.",
        "spoken": "Fyra."
      },
      {
        "parts": [
          {
            "id": "first",
            "text": "4"
          },
          {
            "id": "operator",
            "text": "+"
          },
          {
            "id": "second",
            "text": "3"
          }
        ],
        "text": "Vi adderar en term till, till exempel tre.",
        "spoken": "Fyra plus tre."
      },
      {
        "parts": [
          {
            "id": "first",
            "text": "4"
          },
          {
            "id": "operator",
            "text": "+"
          },
          {
            "id": "second",
            "text": "3"
          },
          {
            "id": "equals",
            "text": "="
          },
          {
            "id": "result",
            "text": "7"
          }
        ],
        "text": "Då blir summan totalt sju. Termerna fyra och tre bildar summan sju.",
        "spoken": "Fyra plus tre är lika med sju."
      }
    ]
  },
  {
    "id": "subtraction",
    "title": "Subtraktion",
    "levels": [
      "high"
    ],
    "compact": false,
    "steps": [
      {
        "parts": [
          {
            "id": "first",
            "text": "7"
          }
        ],
        "text": "Vi börjar med termen sju.",
        "spoken": "Sju."
      },
      {
        "parts": [
          {
            "id": "first",
            "text": "7"
          },
          {
            "id": "operator",
            "text": "−"
          },
          {
            "id": "second",
            "text": "3"
          }
        ],
        "text": "Vi subtraherar termen tre från sju.",
        "spoken": "Sju minus tre."
      },
      {
        "parts": [
          {
            "id": "first",
            "text": "7"
          },
          {
            "id": "operator",
            "text": "−"
          },
          {
            "id": "second",
            "text": "3"
          },
          {
            "id": "equals",
            "text": "="
          },
          {
            "id": "result",
            "text": "4"
          }
        ],
        "text": "Differensen blir fyra. Den visar skillnaden mellan sju och tre.",
        "spoken": "Sju minus tre är lika med fyra."
      }
    ]
  },
  {
    "id": "multiplication",
    "title": "Multiplikation",
    "levels": [
      "high"
    ],
    "compact": false,
    "steps": [
      {
        "parts": [
          {
            "id": "first",
            "text": "4"
          }
        ],
        "text": "Vi börjar med en faktor, fyra.",
        "spoken": "Fyra."
      },
      {
        "parts": [
          {
            "id": "first",
            "text": "4"
          },
          {
            "id": "operator",
            "text": "×"
          },
          {
            "id": "second",
            "text": "3"
          }
        ],
        "text": "Vi multiplicerar med en annan faktor, tre.",
        "spoken": "Fyra gånger tre."
      },
      {
        "parts": [
          {
            "id": "first",
            "text": "4"
          },
          {
            "id": "operator",
            "text": "×"
          },
          {
            "id": "second",
            "text": "3"
          },
          {
            "id": "equals",
            "text": "="
          },
          {
            "id": "result",
            "text": "12"
          }
        ],
        "text": "Produkten blir tolv. Faktorerna fyra och tre bildar produkten tolv.",
        "spoken": "Fyra gånger tre är lika med tolv."
      }
    ]
  },
  {
    "id": "division",
    "title": "Division",
    "levels": [
      "high"
    ],
    "compact": false,
    "steps": [
      {
        "parts": [
          {
            "id": "first",
            "text": "12"
          }
        ],
        "text": "Vi börjar med talet som ska delas: tolv. Det kallas täljare.",
        "spoken": "Tolv."
      },
      {
        "parts": [
          {
            "id": "first",
            "text": "12"
          },
          {
            "id": "operator",
            "text": "÷"
          },
          {
            "id": "second",
            "text": "3"
          }
        ],
        "text": "Vi delar tolv med tre. Talet vi delar med kallas nämnare.",
        "spoken": "Tolv delat med tre."
      },
      {
        "parts": [
          {
            "id": "first",
            "text": "12"
          },
          {
            "id": "operator",
            "text": "÷"
          },
          {
            "id": "second",
            "text": "3"
          },
          {
            "id": "equals",
            "text": "="
          },
          {
            "id": "result",
            "text": "4"
          }
        ],
        "text": "Kvoten blir fyra. Kvot är namnet på resultatet av divisionen.",
        "spoken": "Tolv delat med tre är lika med fyra."
      }
    ]
  }
],
    title: "Räknesättens språk",
    description: "Förstå orden term, summa, faktor och kvot.",
    levels: ["high"],
    languageFocused: true,
    walkthrough: [["Addition", "4 + 3 = 7\nterm + term = summa", "Vid addition läggs termer ihop och bildar en summa.", "4 och 3 är termer. 7 är summan."], ["Subtraktion", "7 − 3 = 4\nterm − term = differens", "Vid subtraktion bestämmer du skillnaden mellan två termer. Resultatet heter differens.", "7 och 3 är termer. 4 är differensen."], ["Multiplikation", "4 × 3 = 12\nfaktor × faktor = produkt", "Talen som multipliceras kallas faktorer. Resultatet heter produkt.", "4 och 3 är faktorer. 12 är produkten."], ["Division", "12 ÷ 3 = 4\ntäljare ÷ nämnare = kvot", "Vid division delas täljaren med nämnaren. Resultatet heter kvot.", "12 är täljare, 3 är nämnare och 4 är kvot. Nämnaren får inte vara noll."]],
    modes: {
      rules: [
        q("Vad heter resultatet?", "4 + 3 = 7", ["Summa", "Produkt", "Term"], 0, "Vid addition lägger du ihop termer. Resultatet kallas summa.", ["high"]),
        q("Vad heter resultatet?", "7 − 3 = 4", ["Kvot", "Differens", "Faktor"], 1, "Resultatet av en subtraktion kallas differens.", ["high"]),
        q("Vad heter talen som multipliceras?", "4 × 3 = 12", ["Termer", "Kvoter", "Faktorer"], 2, "Talen som multipliceras är faktorer. Resultatet är en produkt.", ["high"]),
        q("Vad heter resultatet?", "12 ÷ 3 = 4", ["Kvot", "Nämnare", "Differens"], 0, "Kvoten är resultatet av divisionen.", ["high"]),
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
      ["Bevara summan", "19 + 6 = 20 + 5 = 25", "Vid addition kan du öka den ena termen och minska den andra lika mycket.", "Det du lägger till på ett ställe tar du bort på det andra. Summan bevaras."],
      ["Bevara differensen", "23 − 9 = 24 − 10 = 14", "Vid subtraktion kan du öka båda termerna lika mycket eller minska båda lika mycket.", "Tänk på avståndet mellan två punkter på en tallinje. Om båda flyttas lika långt åt samma håll är avståndet kvar."],
      ["Bevara produkten", "4 × 15 = 8 × 7,5 = 60", "Dubbla den ena faktorn och halvera den andra. Produkten blir densamma.", "Dubbelt så många grupper med hälften så mycket i varje ger samma mängd totalt."],
      ["Bevara kvoten", "12 ÷ 3 = 24 ÷ 6 = 4", "Multiplicera täljare och nämnare med samma tal, som inte är noll. Kvoten bevaras.", "Du kan också dividera båda med samma tal, som inte är noll. Att dubbla båda är ett exempel."],
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
      graphic: [
  {
    "prompt": "Vad mäter arean?",
    "example": "Varje ruta är 1 cm²",
    "choices": [
      "Ytan inne i rektangeln",
      "Längden runt rektangeln",
      "Bara en sida"
    ],
    "correct": 0,
    "explanation": "Arean beskriver hur stor yta figuren täcker.",
    "levels": [
      "high"
    ],
    "visual": {
      "type": "rectangleGrid",
      "columns": 4,
      "rows": 3,
      "alt": "Rektangel med fyra kolumner och tre rader lika stora rutor. Varje ruta är en kvadratcentimeter."
    }
  },
  {
    "prompt": "Vilket uttryck beskriver antalet rutor?",
    "example": "Läs rader och kolumner",
    "choices": [
      "4 + 3",
      "4 × 3",
      "4 − 3"
    ],
    "correct": 1,
    "explanation": "Tre rader med fyra rutor i varje ger 4 × 3 = 12 rutor.",
    "levels": [
      "high"
    ],
    "visual": {
      "type": "rectangleGrid",
      "columns": 4,
      "rows": 3,
      "alt": "Rektangel med fyra kolumner och tre rader lika stora rutor. Varje ruta är en kvadratcentimeter."
    }
  },
  {
    "prompt": "Vilken enhet passar arean?",
    "example": "Rutornas sidor är 1 cm",
    "choices": [
      "cm",
      "m",
      "cm²"
    ],
    "correct": 2,
    "explanation": "Area mäts i kvadratenheter. Varje liten ruta har arean 1 cm².",
    "levels": [
      "high"
    ],
    "visual": {
      "type": "rectangleGrid",
      "columns": 4,
      "rows": 3,
      "alt": "Rektangel med fyra kolumner och tre rader lika stora rutor. Varje ruta är en kvadratcentimeter."
    }
  },
  {
    "prompt": "Vad skulle du mäta för omkretsen?",
    "example": "Skilj på kant och yta",
    "choices": [
      "Längden längs ytterkanten",
      "Antalet rutor inuti",
      "Bara de inre linjerna"
    ],
    "correct": 0,
    "explanation": "Omkretsen är längden runt figuren. Här är den 4 + 3 + 4 + 3 = 14 cm.",
    "levels": [
      "high"
    ],
    "visual": {
      "type": "rectangleGrid",
      "columns": 4,
      "rows": 3,
      "alt": "Rektangel med fyra kolumner och tre rader lika stora rutor. Varje ruta är en kvadratcentimeter."
    }
  }
],
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
    animations: [
  {
    "id": "balance",
    "title": "Bevara balansen",
    "levels": [
      "high"
    ],
    "compact": true,
    "steps": [
      {
        "parts": [
          {
            "id": "left",
            "text": "x + 3"
          },
          {
            "id": "equals",
            "text": "="
          },
          {
            "id": "right",
            "text": "8"
          }
        ],
        "text": "Vi söker talet x. Båda sidor om likhetstecknet ska ha samma värde.",
        "spoken": "x plus tre är lika med åtta."
      },
      {
        "parts": [
          {
            "id": "left",
            "text": "x + 3 − 3"
          },
          {
            "id": "equals",
            "text": "="
          },
          {
            "id": "right",
            "text": "8 − 3"
          }
        ],
        "text": "Vi subtraherar tre på båda sidor. Då bevaras likheten.",
        "spoken": "x plus tre minus tre är lika med åtta minus tre."
      },
      {
        "parts": [
          {
            "id": "left",
            "text": "x"
          },
          {
            "id": "equals",
            "text": "="
          },
          {
            "id": "right",
            "text": "5"
          }
        ],
        "text": "Tre minus tre blir noll. Kvar står x på vänster sida och fem på höger sida.",
        "spoken": "x är lika med fem."
      },
      {
        "parts": [
          {
            "id": "left",
            "text": "5 + 3"
          },
          {
            "id": "equals",
            "text": "="
          },
          {
            "id": "right",
            "text": "8"
          }
        ],
        "text": "Vi kontrollerar genom att sätta in fem i stället för x. Fem plus tre är åtta, så lösningen stämmer.",
        "spoken": "Fem plus tre är lika med åtta."
      }
    ]
  }
],
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
    "topicIds": ["placeValueLanguage"],
    "keywords": "positionssystem ental tiotal hundratal tiondelar hundradelar storleksordna"
  },
  {
    "id": "operations",
    "title": "De fyra räknesätten",
    "description": "Begrepp, räknemetoder och prioriteringsregler.",
    "topicIds": [
      "priorityLanguage",
      "operationLanguage",
      "calculationMethods"
    ],
    "keywords": "addition subtraktion multiplikation division parenteser"
  },
  {
    "id": "rounding",
    "title": "Avrundning och överslag",
    "description": "Närmevärden och rimliga uppskattningar.",
    "topicIds": ["roundingLanguage"],
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
    "topicIds": ["negativeLanguage"],
    "keywords": "positiva tal minus"
  },
  {
    "id": "powers-roots",
    "title": "Potenser och rötter",
    "description": "Bas, exponent, grundpotensform och kvadratrot.",
    "topicIds": ["powerRootLanguage"],
    "keywords": "upphöjt kvadrattal roten ur"
  },
  {
    "id": "prefixes",
    "title": "Prefix",
    "description": "Namn och beteckningar för stora och små tal.",
    "topicIds": ["prefixLanguage"],
    "keywords": "kilo mega giga deci centi milli mikro"
  }
] },
  { id: "geometry", title: "Geometri", description: "Former, mått och samband", subcategories: [
  {
    "id": "angles-shapes",
    "title": "Vinklar och former",
    "description": "Vinklar, trianglar, fyrhörningar och cirklar.",
    "topicIds": ["angleLanguage"],
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
    "topicIds": ["lengthLanguage"],
    "keywords": "meter centimeter millimeter kilometer mil"
  },
  {
    "id": "scale-symmetry",
    "title": "Skala och symmetri",
    "description": "Avbildningar, förstoring, förminskning och symmetri.",
    "topicIds": ["scaleLanguage"],
    "keywords": "spegling rotation verklighet bild"
  },
  {
    "id": "pythagoras",
    "title": "Pythagoras sats",
    "description": "Sambandet mellan sidorna i en rätvinklig triangel.",
    "topicIds": ["pythagorasLanguage"],
    "keywords": "hypotenusa kateter"
  },
  {
    "id": "volume",
    "title": "Volym och rymdgeometri",
    "description": "Kroppar, volym och volymenheter.",
    "topicIds": ["volumeLanguage", "volumeUnitsLanguage"],
    "keywords": "rätblock kub cylinder liter deciliter centiliter milliliter"
  }
] },
  { id: "percent", title: "Procent", description: "Andelar och förändringar", subcategories: [
  {
    "id": "fractions",
    "title": "Bråk",
    "description": "Andelar, bråkformer och att räkna med bråk.",
    "topicIds": ["fractionLanguage", "fractionMethodLanguage", "fractionPartLanguage"],
    "keywords": "täljare nämnare förkorta förlänga blandad form"
  },
  {
    "id": "percent-basics",
    "title": "Förstå procent",
    "description": "Hundradelar och sambandet mellan andel, del och helhet.",
    "topicIds": ["percent", "fractionFormsLanguage"],
    "keywords": "procentform decimalform hälften fjärdedel"
  },
  {
    "id": "percent-change",
    "title": "Förändring och ränta",
    "description": "Procentuell förändring, förändringsfaktor och ränta.",
    "topicIds": ["percentChangeLanguage"],
    "keywords": "rabatt ökning minskning lån årsränta"
  }
] },
  { id: "statistics", title: "Statistik", description: "Data och lägesmått", subcategories: [
  {
    "id": "tables-charts",
    "title": "Tabeller och diagram",
    "description": "Samla, läsa och granska statistiskt material.",
    "topicIds": ["dataLanguage"],
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
    "topicIds": ["replacementLanguage"],
    "keywords": "återläggning träddiagram"
  },
  {
    "id": "combinations",
    "title": "Kombinatorik",
    "description": "Räkna möjliga kombinationer och placeringar.",
    "topicIds": ["combinationLanguage"],
    "keywords": "ordning urval handskakning"
  }
] },
  { id: "algebra", title: "Algebra", description: "Uttryck och ekvationer", subcategories: [
  {
    "id": "expressions",
    "title": "Variabler och uttryck",
    "description": "Bokstäver, mönster, förenkling och parenteser.",
    "topicIds": ["expressionLanguage"],
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
    "topicIds": ["problemLanguage"],
    "keywords": "hastighet sträcka tid kilopris literpris per redovisa rimlighet"
  },
  {
    "id": "functions",
    "title": "Koordinater och funktioner",
    "description": "Koordinatsystem, linjära samband och proportionalitet.",
    "topicIds": ["coordinateLanguage", "proportionLanguage", "linearLanguage"],
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
let animationIndex = 0;
let animationStepIndex = 0;
let quickScore = 0;
let topicsOrigin = "home";
let settingsOrigin = "home";
let touchStartY = null;
let touchCurrentY = null;
let touchStartedAt = 0;
let swipeAnimating = false;
let wheelLocked = false;
let wheelUnlockTimer;
let swipeRevision = 0;

function showScreen(name) {
  resetSwipe();
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
  const available = [...(topicAnimations().length ? ["animate"] : []), ...(selectedTopic.walkthrough?.length ? ["walkthrough"] : []), ...Object.keys(selectedTopic.modes).filter((mode) => modeQuestions(mode).length)];
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

function topicAnimations(topic = selectedTopic) {
  if (!topic?.levels.includes(level)) return [];
  return (topic.animations || []).filter((animation) => animation.levels.includes(level) && animation.steps.length > 0);
}

function modeQuestions(mode) {
  return selectedTopic.modes[mode].filter((question) => question.levels.includes(level));
}

function startMode(mode) {
  currentMode = mode;
  questionIndex = 0;
  quickScore = 0;
  saveLastVisited();
  if (mode === "animate") {
    startAnimation();
  } else if (mode === "walkthrough") {
    walkthroughIndex = 0;
    renderWalkthrough();
    showScreen("walkthrough");
  } else {
    renderQuestion();
    showScreen("quiz");
  }
}

function startAnimation() {
  const animations = topicAnimations();
  if (!animations.length) { showScreen("mode"); return; }
  animationIndex = 0;
  animationStepIndex = 0;
  $("#animation-expression").replaceChildren();
  renderAnimationStep();
  showScreen("animation");
}

function changeAnimation(direction) {
  const animations = topicAnimations();
  const step = direction < 0 ? 1 : -1;
  animationIndex = (animationIndex + step + animations.length) % animations.length;
  animationStepIndex = 0;
  $("#animation-expression").replaceChildren();
  renderAnimationStep();
  $("#animation-heading").focus({ preventScroll: true });
}

function renderAnimationStep() {
  const animation = topicAnimations()[animationIndex];
  const step = animation.steps[animationStepIndex];
  const complete = animationStepIndex === animation.steps.length - 1;
  $("#animation-heading").textContent = animation.title;
  $("#animation-progress").textContent = `Övning ${animationIndex + 1} av ${topicAnimations().length} · Steg ${animationStepIndex + 1} av ${animation.steps.length}${complete ? " · Klart" : ""}`;
  $("#animation-text").textContent = step.text;
  $("#animation-spoken").textContent = step.spoken;
  const expression = $("#animation-expression");
  expression.classList.toggle("is-compact", Boolean(animation.compact));
  // Reuse unchanged symbols. Only new or changed parts animate, and future steps
  // do not exist in the DOM (including the screen-reader description).
  const previous = new Map([...expression.children].map((node) => [node.dataset.part, node]));
  const parts = step.parts.map((part) => {
    const existing = previous.get(part.id);
    if (existing?.textContent === part.text) return existing;
    const span = document.createElement("span");
    span.dataset.part = part.id;
    span.className = "animation-part";
    span.textContent = part.text;
    return span;
  });
  [...expression.children].forEach((node) => { if (!parts.includes(node)) node.remove(); });
  parts.forEach((node, index) => {
    if (expression.children[index] !== node) expression.insertBefore(node, expression.children[index] || null);
  });
  $("#animation-previous").disabled = animationStepIndex === 0;
  $("#animation-replay").hidden = !complete;
  $("#animation-next").textContent = complete ? "Klar" : "Nästa";
}

function renderExample(container, text, visual) {
  container.replaceChildren();
  container.classList.toggle("has-visual", Boolean(visual));
  container.closest(".practice-screen").classList.toggle("visual-practice", Boolean(visual));
  if (visual) {
    container.append(MathGraphics.render(visual));
    const caption = document.createElement("span");
    caption.className = "visual-caption";
    caption.textContent = text;
    container.append(caption);
  } else {
    const lines = text.split("\n");
    lines.forEach((line, index) => {
      const span = document.createElement("span");
      span.className = index === 0 ? "example-expression" : "example-vocabulary";
      span.textContent = line;
      container.append(span);
    });
  }
}

function renderQuestion() {
  const questions = modeQuestions(currentMode);
  const question = questions[questionIndex];
  $("#quiz-screen").classList.toggle("language-practice", Boolean(selectedTopic.languageFocused || question.visual));
  $("#mode-label").textContent = currentMode === "quick" ? `Snabbträning · ${quickScore} rätt` : modeCatalog[currentMode].name;
  $("#question-progress").textContent = `Fråga ${questionIndex + 1} av ${questions.length}`;
  $("#question-heading").textContent = question.prompt;
  renderExample($("#question-example"), question.example, question.visual);
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
  renderExample($("#walkthrough-example"), step[1], step[4]);
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
$("#back-from-animation").addEventListener("click", () => showScreen("mode"));
$("#animation-previous").addEventListener("click", () => {
  animationStepIndex = Math.max(0, animationStepIndex - 1);
  renderAnimationStep();
});
$("#animation-next").addEventListener("click", () => {
  const animation = topicAnimations()[animationIndex];
  if (animationStepIndex === animation.steps.length - 1) showScreen("mode");
  else { animationStepIndex += 1; renderAnimationStep(); }
});
$("#animation-replay").addEventListener("click", () => {
  animationStepIndex = 0;
  $("#animation-expression").replaceChildren();
  renderAnimationStep();
  $("#animation-next").focus();
});
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

function swipeCard() {
  return ["quiz", "animation"].includes(activeScreen) ? $(`#${activeScreen}-screen .quiz-card`) : null;
}

function resetSwipe() {
  // Invalidate pending transitions when navigating away or opening another topic.
  swipeRevision += 1;
  touchStartY = null;
  touchCurrentY = null;
  swipeAnimating = false;
  wheelLocked = false;
  clearTimeout(wheelUnlockTimer);
  document.querySelectorAll(".quiz-card").forEach((card) => {
    card.classList.remove("is-dragging", "is-snapping");
    card.style.transform = "";
    card.style.opacity = "";
  });
}

function changePracticeExercise(direction) {
  if (activeScreen === "animation") changeAnimation(direction);
  else changeQuestion(direction);
}

function animatePageChange(direction) {
  const card = swipeCard();
  if (!card || swipeAnimating) return;
  const revision = ++swipeRevision;
  touchStartY = null;
  touchCurrentY = null;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    card.classList.remove("is-dragging", "is-snapping");
    card.style.transform = "";
    card.style.opacity = "";
    changePracticeExercise(direction);
    return;
  }
  swipeAnimating = true;
  const exitY = direction < 0 ? "-110%" : "110%";
  const enterY = direction < 0 ? "110%" : "-110%";
  card.classList.remove("is-dragging");
  card.classList.add("is-snapping");
  card.style.transform = `translateY(${exitY})`;
  card.style.opacity = "0";
  window.setTimeout(() => {
    if (revision !== swipeRevision) return;
    changePracticeExercise(direction);
    card.classList.remove("is-snapping");
    card.style.transform = `translateY(${enterY})`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      if (revision !== swipeRevision) return;
      card.classList.add("is-snapping");
      card.style.transform = "translateY(0)";
      card.style.opacity = "1";
      window.setTimeout(() => {
        if (revision !== swipeRevision) return;
        card.classList.remove("is-snapping");
        card.style.transform = "";
        card.style.opacity = "";
        swipeAnimating = false;
      }, 240);
    }));
  }, 230);
}

function snapPageBack() {
  const card = swipeCard();
  if (!card) return;
  const revision = ++swipeRevision;
  card.classList.remove("is-dragging");
  card.classList.add("is-snapping");
  card.style.transform = "translateY(0)";
  card.style.opacity = "1";
  window.setTimeout(() => {
    if (revision !== swipeRevision) return;
    card.classList.remove("is-snapping");
    card.style.transform = "";
    card.style.opacity = "";
  }, 240);
}

document.addEventListener("touchstart", (event) => {
  const card = swipeCard();
  if (!card || swipeAnimating || !card.contains(event.target)) return;
  if (event.touches.length !== 1) { resetSwipe(); return; }
  // A new drag supersedes any unfinished spring-back.
  swipeRevision += 1;
  card.classList.remove("is-snapping");
  touchStartY = event.touches[0].clientY;
  touchCurrentY = touchStartY;
  touchStartedAt = performance.now();
  card.classList.add("is-dragging");
}, { passive: true });

document.addEventListener("touchmove", (event) => {
  const card = swipeCard();
  if (!card || touchStartY === null || swipeAnimating) return;
  if (event.touches.length !== 1) { resetSwipe(); return; }
  event.preventDefault();
  touchCurrentY = event.touches[0].clientY;
  const delta = Math.max(-180, Math.min(180, touchCurrentY - touchStartY));
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    card.style.transform = `translateY(${delta}px) scale(${1 - Math.abs(delta) / 5000})`;
    card.style.opacity = String(1 - Math.abs(delta) / 700);
  }
}, { passive: false });

document.addEventListener("touchend", () => {
  if (!swipeCard() || touchStartY === null || swipeAnimating) return;
  const delta = touchCurrentY - touchStartY;
  const elapsed = Math.max(1, performance.now() - touchStartedAt);
  const velocity = Math.abs(delta) / elapsed;
  touchStartY = null;
  touchCurrentY = null;
  if (Math.abs(delta) >= 95 || (Math.abs(delta) >= 45 && velocity > .55)) animatePageChange(Math.sign(delta));
  else snapPageBack();
}, { passive: true });
document.addEventListener("touchcancel", resetSwipe, { passive: true });
document.addEventListener("wheel", (event) => {
  const card = swipeCard();
  if (!card) return;
  event.preventDefault();
  if (wheelLocked || swipeAnimating || Math.abs(event.deltaY) < 20) return;
  wheelLocked = true;
  animatePageChange(-Math.sign(event.deltaY));
  clearTimeout(wheelUnlockTimer);
  wheelUnlockTimer = setTimeout(() => { wheelLocked = false; }, 450);
}, { passive: false });
document.addEventListener("keydown", (event) => {
  if (activeScreen !== "animation" || !["ArrowUp", "ArrowDown"].includes(event.key) || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (!swipeCard().contains(event.target)) return;
  event.preventDefault();
  if (!event.repeat) animatePageChange(event.key === "ArrowDown" ? -1 : 1);
});


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
      const vocabulary = questions.flatMap((question) => [question.prompt, question.example, question.choices[question.correct], question.explanation, question.visual?.alt || ""]);
      return { title: topic.title, description: path, category, group, topicId, ready: true,
        text: [path, topic.title, topic.description, ...(topic.walkthrough || []).flatMap((step) => [...step.slice(0, 4), step[4]?.alt || ""]), ...vocabulary, ...topicAnimations(topic).flatMap((animation) => ["Animera", animation.title, ...animation.steps.flatMap((step) => [step.text, step.spoken, ...step.parts.map((part) => part.text)])])].join(" ") };
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
