export const isv2026Config = {
  "country": "PT",
  "tax": "ISV",
  "year": 2026,
  "source_type": "normalized_from_public_tables",
  "sources": [
    {
      "name": "Diário da República - Código do Imposto sobre Veículos",
      "type": "legal_framework"
    },
    {
      "name": "impostosobreveiculos.info - ISV 2026",
      "type": "rate_tables"
    }
  ],
  "metadata": {
    "currency": "EUR",
    "vehicle_scope": "ligeiros_passageiros",
    "notes": [
      "Em 2026 existe uma tabela única para a totalidade do imposto nos ligeiros de passageiros.",
      "Os usados importados da UE têm redução por idade.",
      "Veículos de países terceiros não UE não beneficiam da redução por idade."
    ]
  },
  "passenger_cars": {
    "cylinder_component": [
      {
        "min_cm3": 0,
        "max_cm3": 1000,
        "rate_per_cm3": 1.09,
        "deduction": 849.03
      },
      {
        "min_cm3": 1001,
        "max_cm3": 1250,
        "rate_per_cm3": 1.18,
        "deduction": 850.69
      },
      {
        "min_cm3": 1251,
        "max_cm3": null,
        "rate_per_cm3": 5.61,
        "deduction": 6194.88
      }
    ],
    "co2_component": {
      "gasoline_nedc": [
        { "min_gkm": 0,   "max_gkm": 99,  "rate_per_gkm": 4.62,   "deduction": 427.00 },
        { "min_gkm": 100, "max_gkm": 115, "rate_per_gkm": 8.09,   "deduction": 750.99 },
        { "min_gkm": 116, "max_gkm": 145, "rate_per_gkm": 52.56,  "deduction": 5903.94 },
        { "min_gkm": 146, "max_gkm": 175, "rate_per_gkm": 61.24,  "deduction": 7140.17 },
        { "min_gkm": 176, "max_gkm": 195, "rate_per_gkm": 155.97, "deduction": 23627.27 },
        { "min_gkm": 196, "max_gkm": null,"rate_per_gkm": 205.65, "deduction": 33390.12 }
      ],
      "gasoline_wltp": [
        { "min_gkm": 0,   "max_gkm": 110, "rate_per_gkm": 0.44,   "deduction": 43.02 },
        { "min_gkm": 111, "max_gkm": 115, "rate_per_gkm": 1.10,   "deduction": 115.80 },
        { "min_gkm": 116, "max_gkm": 120, "rate_per_gkm": 1.38,   "deduction": 147.79 },
        { "min_gkm": 121, "max_gkm": 130, "rate_per_gkm": 5.27,   "deduction": 619.17 },
        { "min_gkm": 131, "max_gkm": 145, "rate_per_gkm": 6.38,   "deduction": 762.73 },
        { "min_gkm": 146, "max_gkm": 175, "rate_per_gkm": 41.54,  "deduction": 5819.56 },
        { "min_gkm": 176, "max_gkm": 195, "rate_per_gkm": 51.38,  "deduction": 7247.39 },
        { "min_gkm": 196, "max_gkm": 235, "rate_per_gkm": 193.01, "deduction": 34190.52 },
        { "min_gkm": 236, "max_gkm": null,"rate_per_gkm": 233.81, "deduction": 41910.96 }
      ],
      "diesel_nedc": [
        { "min_gkm": 0,   "max_gkm": 79,  "rate_per_gkm": 5.78,   "deduction": 439.04 },
        { "min_gkm": 80,  "max_gkm": 95,  "rate_per_gkm": 23.45,  "deduction": 1848.58 },
        { "min_gkm": 96,  "max_gkm": 120, "rate_per_gkm": 79.22,  "deduction": 7195.63 },
        { "min_gkm": 121, "max_gkm": 140, "rate_per_gkm": 175.73, "deduction": 18924.92 },
        { "min_gkm": 141, "max_gkm": 160, "rate_per_gkm": 195.43, "deduction": 21720.92 },
        { "min_gkm": 161, "max_gkm": null,"rate_per_gkm": 268.42, "deduction": 33447.90 }
      ],
      "diesel_wltp": [
        { "min_gkm": 0,   "max_gkm": 110, "rate_per_gkm": 1.72,   "deduction": 11.50 },
        { "min_gkm": 111, "max_gkm": 120, "rate_per_gkm": 18.96,  "deduction": 1906.19 },
        { "min_gkm": 121, "max_gkm": 140, "rate_per_gkm": 65.04,  "deduction": 7360.85 },
        { "min_gkm": 141, "max_gkm": 150, "rate_per_gkm": 127.40, "deduction": 16080.57 },
        { "min_gkm": 151, "max_gkm": 160, "rate_per_gkm": 160.81, "deduction": 21176.06 },
        { "min_gkm": 161, "max_gkm": 170, "rate_per_gkm": 221.69, "deduction": 29227.38 },
        { "min_gkm": 171, "max_gkm": 190, "rate_per_gkm": 274.08, "deduction": 36987.98 },
        { "min_gkm": 191, "max_gkm": null,"rate_per_gkm": 282.35, "deduction": 38271.32 }
      ]
    },
    "diesel_particles_surcharge": {
      "threshold_gkm": 0.001,
      "surcharge_if_equal_or_above": 500.0,
      "surcharge_if_missing_data": 500.0,
      "surcharge_if_below_threshold": 0.0
    },
    "used_import_age_reduction_eu": [
      { "min_years": 0,  "max_years": 1,  "reduction_percent": 10 },
      { "min_years": 1,  "max_years": 2,  "reduction_percent": 20 },
      { "min_years": 2,  "max_years": 3,  "reduction_percent": 28 },
      { "min_years": 3,  "max_years": 4,  "reduction_percent": 35 },
      { "min_years": 4,  "max_years": 5,  "reduction_percent": 43 },
      { "min_years": 5,  "max_years": 6,  "reduction_percent": 52 },
      { "min_years": 6,  "max_years": 7,  "reduction_percent": 60 },
      { "min_years": 7,  "max_years": 8,  "reduction_percent": 65 },
      { "min_years": 8,  "max_years": 9,  "reduction_percent": 70 },
      { "min_years": 9,  "max_years": 10, "reduction_percent": 75 },
      { "min_years": 10, "max_years": null, "reduction_percent": 80 }
    ],
    "benefits": {
      "hybrid": {
        "pay_percent_of_isv": 60,
        "discount_percent": 40,
        "conditions": {
          "min_electric_range_km": 50,
          "max_co2_gkm": 50
        }
      },
      "plug_in_hybrid": {
        "pay_percent_of_isv": 25,
        "discount_percent": 75,
        "conditions": {
          "min_electric_range_km": 50,
          "rules": [
            {
              "applies_to": "non_euro_6e_bis",
              "max_co2_gkm": 50
            },
            {
              "applies_to": "euro_6e_bis",
              "max_co2_gkm": 80
            }
          ]
        }
      }
    }
  },
  "calculation_rules": {
    "formula_passenger_car": "isv_total = cylinder_component + co2_component + diesel_particles_surcharge",
    "used_import_from_eu_note": "A redução por idade aplica-se aos importados usados da UE.",
    "homologation_required": "Escolher tabela CO2 correta conforme combustível e norma NEDC/WLTP do veículo."
  }
} as const;
