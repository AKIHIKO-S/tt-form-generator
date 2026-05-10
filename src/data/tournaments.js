// AUTO-GENERATED - do not edit by hand. Regenerate via /tmp/build_tournaments_js.py
// 卓球大会テンプレートのメタデータ

export const tournaments = [
  {
    "id": "marimo",
    "file": "marimo.xlsx",
    "name": "第６回まりもオープン IN Ａｋａｎ（ラージボール大会）",
    "team_info": {
      "sheet": "団体名等入力",
      "row": 3,
      "cells": {
        "team_name": {
          "col": 2,
          "row": 3
        },
        "responsible": {
          "col": 3,
          "row": 3
        },
        "phone": {
          "col": 4,
          "row": 3
        }
      },
      "coaches": []
    },
    "events": [
      {
        "id": "event_1",
        "sheet": "団体（男女）",
        "title": "団体（男子・女子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "所属団体名",
            "type": "text"
          },
          {
            "col": 6,
            "key": "extra2",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "一般男子",
            "fee": 1000
          },
          {
            "name": "一般女子",
            "fee": 1000
          }
        ]
      },
      {
        "id": "event_2",
        "sheet": "ダブルス（男女）",
        "title": "ダブルス（男子・女子）",
        "type": "doubles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name1",
            "label": "氏名１",
            "type": "text"
          },
          {
            "col": 4,
            "key": "name2",
            "label": "氏名２",
            "type": "text"
          },
          {
            "col": 5,
            "key": "team1",
            "label": "氏名2",
            "type": "text"
          },
          {
            "col": 6,
            "key": "team2",
            "label": "年齢",
            "type": "text"
          },
          {
            "col": 7,
            "key": "extra1",
            "label": "氏名１の団体名",
            "type": "text"
          },
          {
            "col": 8,
            "key": "extra2",
            "label": "氏名２の団体名",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "一般男子",
            "fee": 1000
          },
          {
            "name": "一般女子",
            "fee": 1000
          }
        ]
      },
      {
        "id": "event_3",
        "sheet": "シングルス（男女）",
        "title": "シングルス（男子・女子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 6,
            "key": "extra2",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "一般男子",
            "fee": 700
          },
          {
            "name": "一般女子",
            "fee": 700
          }
        ]
      }
    ],
    "extras": [
      {
        "title": "お弁当注文票（＠800円）",
        "price": 800,
        "name_col": 2,
        "start_row": 7,
        "end_row": 26,
        "id": "bento",
        "sheet": "お弁当注文票"
      },
      {
        "title": "懇親会申込（＠3,500円）",
        "price": 3500,
        "name_col": 2,
        "start_row": 7,
        "end_row": 26,
        "id": "konshinkai",
        "sheet": "懇親会"
      }
    ],
    "description": "団体（男子・女子） / ダブルス（男子・女子） / シングルス（男子・女子）"
  },
  {
    "id": "kaichohai",
    "file": "kaichohai.xlsx",
    "name": "会長杯/高校釧根支部オープン",
    "team_info": {
      "sheet": "団体名等入力",
      "row": 3,
      "cells": {
        "team_name": {
          "col": 2,
          "row": 3
        },
        "responsible": {
          "col": 3,
          "row": 3
        },
        "phone": {
          "col": 4,
          "row": 3
        }
      },
      "coaches": [
        {
          "row": 7,
          "col": 2,
          "label": "顧問"
        },
        {
          "row": 7,
          "col": 3,
          "label": "コーチ"
        },
        {
          "row": 7,
          "col": 4,
          "label": "コーチ"
        }
      ]
    },
    "events": [
      {
        "id": "event_1",
        "sheet": "男女団体",
        "title": "団体（男子・女子）",
        "type": "team",
        "category_col": 2,
        "start_row": 5,
        "end_row": 24,
        "fields": [
          {
            "col": 3,
            "key": "team",
            "label": "チーム名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "member1",
            "label": "氏名1",
            "type": "text"
          },
          {
            "col": 5,
            "key": "member2",
            "label": "氏名2",
            "type": "text"
          },
          {
            "col": 6,
            "key": "member3",
            "label": "氏名3",
            "type": "text"
          },
          {
            "col": 7,
            "key": "member4",
            "label": "氏名4",
            "type": "text"
          },
          {
            "col": 8,
            "key": "member5",
            "label": "氏名5",
            "type": "text"
          },
          {
            "col": 9,
            "key": "member6",
            "label": "氏名6",
            "type": "text"
          },
          {
            "col": 10,
            "key": "member7",
            "label": "氏名7",
            "type": "text"
          },
          {
            "col": 11,
            "key": "member8",
            "label": "氏名8",
            "type": "text"
          },
          {
            "col": 14,
            "key": "registered",
            "label": "登録/未登録",
            "type": "select",
            "options": [
              "登録",
              "未登録"
            ]
          }
        ],
        "categories": [
          {
            "name": "一般男子",
            "fee": 3000
          },
          {
            "name": "一般女子",
            "fee": 3000
          },
          {
            "name": "高校男子",
            "fee": 2000
          },
          {
            "name": "高校女子",
            "fee": 2000
          },
          {
            "name": "中学男子",
            "fee": 2000
          },
          {
            "name": "中学女子",
            "fee": 2000
          },
          {
            "name": "小学男子",
            "fee": 2000
          },
          {
            "name": "小学女子",
            "fee": 2000
          }
        ]
      },
      {
        "id": "event_2",
        "sheet": "男女シングルス",
        "title": "シングルス（男子・女子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "一般男子",
            "fee": 700
          },
          {
            "name": "一般女子",
            "fee": 700
          },
          {
            "name": "高校男子",
            "fee": 500
          },
          {
            "name": "高校女子",
            "fee": 500
          },
          {
            "name": "中学男子",
            "fee": 500
          },
          {
            "name": "中学女子",
            "fee": 500
          },
          {
            "name": "小学男子",
            "fee": 500
          },
          {
            "name": "小学女子",
            "fee": 500
          }
        ]
      },
      {
        "id": "event_3",
        "sheet": "男女ダブルス",
        "title": "ダブルス（男子・女子）",
        "type": "doubles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name1",
            "label": "氏名１",
            "type": "text"
          },
          {
            "col": 4,
            "key": "name2",
            "label": "氏名２",
            "type": "text"
          },
          {
            "col": 5,
            "key": "team1",
            "label": "氏名１の団体名",
            "type": "text"
          },
          {
            "col": 6,
            "key": "team2",
            "label": "氏名２の団体名",
            "type": "text"
          },
          {
            "col": 7,
            "key": "extra1",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "一般男子",
            "fee": 1000
          },
          {
            "name": "一般女子",
            "fee": 1000
          },
          {
            "name": "高校男子",
            "fee": 800
          },
          {
            "name": "高校女子",
            "fee": 800
          },
          {
            "name": "中学男子",
            "fee": 800
          },
          {
            "name": "中学女子",
            "fee": 800
          },
          {
            "name": "小学男子",
            "fee": 800
          },
          {
            "name": "小学女子",
            "fee": 800
          }
        ]
      }
    ],
    "extras": [],
    "description": "団体（男子・女子） / シングルス（男子・女子） / ダブルス（男子・女子）"
  },
  {
    "id": "kokusupo",
    "file": "kokusupo.xlsx",
    "name": "国スポ（少年の部）釧路地区予選",
    "team_info": {
      "sheet": "団体名等入力",
      "row": 3,
      "cells": {
        "team_name": {
          "col": 2,
          "row": 3
        },
        "responsible": {
          "col": 3,
          "row": 3
        },
        "phone": {
          "col": 4,
          "row": 3
        }
      },
      "coaches": []
    },
    "events": [
      {
        "id": "event_1",
        "sheet": "男女シングルス",
        "title": "シングルス（男子・女子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "学年",
            "type": "text"
          },
          {
            "col": 6,
            "key": "extra2",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "男子",
            "fee": 500
          },
          {
            "name": "女子",
            "fee": 500
          }
        ]
      }
    ],
    "extras": [],
    "description": "シングルス（男子・女子）"
  },
  {
    "id": "yasaka",
    "file": "yasaka.xlsx",
    "name": "第51回ヤサカ杯",
    "team_info": {
      "sheet": "団体名等入力",
      "row": 3,
      "cells": {
        "team_name": {
          "col": 2,
          "row": 3
        },
        "responsible": {
          "col": 3,
          "row": 3
        },
        "phone": {
          "col": 4,
          "row": 3
        }
      },
      "coaches": [
        {
          "row": 7,
          "col": 2,
          "label": "顧問"
        },
        {
          "row": 7,
          "col": 3,
          "label": "コーチ"
        },
        {
          "row": 7,
          "col": 4,
          "label": "コーチ"
        }
      ]
    },
    "events": [
      {
        "id": "event_1",
        "sheet": "男女シングルス",
        "title": "シングルス（男子・女子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "一般男子",
            "fee": 700
          },
          {
            "name": "一般女子",
            "fee": 700
          },
          {
            "name": "高校男子",
            "fee": 500
          },
          {
            "name": "高校女子",
            "fee": 500
          },
          {
            "name": "中学男子",
            "fee": 500
          },
          {
            "name": "中学女子",
            "fee": 500
          },
          {
            "name": "小学男子",
            "fee": 500
          },
          {
            "name": "小学女子",
            "fee": 500
          }
        ]
      },
      {
        "id": "event_2",
        "sheet": "男女ダブルス",
        "title": "ダブルス（ミックス・男子・女子）",
        "type": "doubles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name1",
            "label": "氏名１",
            "type": "text"
          },
          {
            "col": 4,
            "key": "name2",
            "label": "氏名２",
            "type": "text"
          },
          {
            "col": 5,
            "key": "team1",
            "label": "氏名１の団体名",
            "type": "text"
          },
          {
            "col": 6,
            "key": "team2",
            "label": "氏名２の団体名",
            "type": "text"
          },
          {
            "col": 7,
            "key": "extra1",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "ミックス",
            "fee": 1000
          },
          {
            "name": "一般男子",
            "fee": 1000
          },
          {
            "name": "一般女子",
            "fee": 1000
          },
          {
            "name": "高校男子",
            "fee": 800
          },
          {
            "name": "高校女子",
            "fee": 800
          },
          {
            "name": "中学男子",
            "fee": 800
          },
          {
            "name": "中学女子",
            "fee": 800
          }
        ]
      }
    ],
    "extras": [],
    "description": "シングルス（男子・女子） / ダブルス（ミックス・男子・女子）"
  },
  {
    "id": "league54",
    "file": "league54.xlsx",
    "name": "EHSC杯\n第５４回くしろリーグ団体選手権",
    "team_info": {
      "sheet": "団体名等入力",
      "row": 3,
      "cells": {
        "team_name": {
          "col": 2,
          "row": 3
        },
        "responsible": {
          "col": 3,
          "row": 3
        },
        "phone": {
          "col": 4,
          "row": 3
        }
      },
      "coaches": [
        {
          "row": 6,
          "col": 2,
          "label": "顧問"
        },
        {
          "row": 6,
          "col": 3,
          "label": "コーチ"
        },
        {
          "row": 6,
          "col": 4,
          "label": "コーチ"
        }
      ]
    },
    "events": [
      {
        "id": "event_1",
        "sheet": "団体",
        "title": "団体",
        "type": "team",
        "category_col": 2,
        "start_row": 5,
        "end_row": 24,
        "fields": [
          {
            "col": 3,
            "key": "team",
            "label": "チーム名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "member1",
            "label": "氏名1",
            "type": "text"
          },
          {
            "col": 5,
            "key": "member2",
            "label": "氏名2",
            "type": "text"
          },
          {
            "col": 6,
            "key": "member3",
            "label": "氏名3",
            "type": "text"
          },
          {
            "col": 7,
            "key": "member4",
            "label": "氏名4",
            "type": "text"
          },
          {
            "col": 8,
            "key": "member5",
            "label": "氏名5",
            "type": "text"
          },
          {
            "col": 9,
            "key": "member6",
            "label": "氏名6",
            "type": "text"
          },
          {
            "col": 10,
            "key": "member7",
            "label": "氏名7",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "一般",
            "fee": 4000
          },
          {
            "name": "小・中・高",
            "fee": 3000
          }
        ]
      }
    ],
    "extras": [],
    "description": "団体"
  },
  {
    "id": "nittaku",
    "file": "nittaku.xlsx",
    "name": "釧路選手権（Nittaku杯）兼釧路市体育祭\n　兼　北海道選手権（一般の部）地区予選会",
    "team_info": {
      "sheet": "団体名等入力",
      "row": 3,
      "cells": {
        "team_name": {
          "col": 2,
          "row": 3
        },
        "responsible": {
          "col": 3,
          "row": 3
        },
        "phone": {
          "col": 4,
          "row": 3
        }
      },
      "coaches": [
        {
          "row": 6,
          "col": 2,
          "label": "顧問"
        },
        {
          "row": 6,
          "col": 3,
          "label": "コーチ"
        },
        {
          "row": 6,
          "col": 4,
          "label": "コーチ"
        }
      ]
    },
    "events": [
      {
        "id": "event_1",
        "sheet": "男女シングルス",
        "title": "シングルス（男子・女子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "一般男子",
            "fee": 700
          },
          {
            "name": "一般女子",
            "fee": 700
          },
          {
            "name": "高校男子",
            "fee": 700
          },
          {
            "name": "高校女子",
            "fee": 700
          },
          {
            "name": "中学男子",
            "fee": 700
          },
          {
            "name": "中学女子",
            "fee": 700
          },
          {
            "name": "小学男子",
            "fee": 700
          },
          {
            "name": "小学女子",
            "fee": 700
          }
        ]
      },
      {
        "id": "event_2",
        "sheet": "ＰＭカデット（男）",
        "title": "シングルス（男子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "年齢 （中学2年以下）",
            "type": "text"
          },
          {
            "col": 6,
            "key": "extra2",
            "label": "登録/未登録",
            "type": "text"
          }
        ],
        "categories": []
      },
      {
        "id": "event_3",
        "sheet": "ＰＭカデット（女）",
        "title": "シングルス（女子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "年齢 （中学2年以下）",
            "type": "text"
          },
          {
            "col": 6,
            "key": "extra2",
            "label": "登録/未登録",
            "type": "text"
          }
        ],
        "categories": []
      },
      {
        "id": "event_4",
        "sheet": "男女,ミックスダブルス",
        "title": "ダブルス（男子・女子・ミックス）",
        "type": "doubles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name1",
            "label": "氏名１",
            "type": "text"
          },
          {
            "col": 4,
            "key": "name2",
            "label": "氏名２",
            "type": "text"
          },
          {
            "col": 5,
            "key": "team1",
            "label": "氏名１の団体名",
            "type": "text"
          },
          {
            "col": 6,
            "key": "team2",
            "label": "氏名２の団体名",
            "type": "text"
          },
          {
            "col": 7,
            "key": "extra1",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "ミックス",
            "fee": 1000
          },
          {
            "name": "一般男子",
            "fee": 1000
          },
          {
            "name": "一般女子",
            "fee": 1000
          },
          {
            "name": "高校男子",
            "fee": 1000
          },
          {
            "name": "高校女子",
            "fee": 1000
          },
          {
            "name": "中学男子",
            "fee": 1000
          },
          {
            "name": "中学女子",
            "fee": 1000
          },
          {
            "name": "小学男子",
            "fee": 1000
          },
          {
            "name": "小学女子",
            "fee": 1000
          }
        ]
      }
    ],
    "extras": [],
    "description": "シングルス（男子・女子） / シングルス（男子） / シングルス（女子） / ダブルス（男子・女子・ミックス）"
  },
  {
    "id": "hokkaido_cadet",
    "file": "hokkaido_cadet.xlsx",
    "name": "北海道選手権（カデットの部）地区予選会",
    "team_info": {
      "sheet": "団体名等入力",
      "row": 3,
      "cells": {
        "team_name": {
          "col": 2,
          "row": 3
        },
        "responsible": {
          "col": 3,
          "row": 3
        },
        "phone": {
          "col": 4,
          "row": 3
        }
      },
      "coaches": [
        {
          "row": 7,
          "col": 2,
          "label": "顧問"
        },
        {
          "row": 7,
          "col": 3,
          "label": "コーチ"
        },
        {
          "row": 7,
          "col": 4,
          "label": "コーチ"
        }
      ]
    },
    "events": [
      {
        "id": "event_1",
        "sheet": "男女シングルス",
        "title": "シングルス（男子・女子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "一般男子",
            "fee": 700
          },
          {
            "name": "一般女子",
            "fee": 700
          },
          {
            "name": "高校男子",
            "fee": 500
          },
          {
            "name": "高校女子",
            "fee": 500
          },
          {
            "name": "13歳男子（中学1年）以下",
            "fee": 500
          },
          {
            "name": "13歳女子（中学1年）以下",
            "fee": 500
          },
          {
            "name": "14歳男子（中学2年）以下",
            "fee": 500
          },
          {
            "name": "14歳女子（中学2年）以下",
            "fee": 500
          }
        ]
      },
      {
        "id": "event_2",
        "sheet": "男女ダブルス",
        "title": "ダブルス（男子・女子）",
        "type": "doubles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name1",
            "label": "氏名１",
            "type": "text"
          },
          {
            "col": 4,
            "key": "name2",
            "label": "氏名２",
            "type": "text"
          },
          {
            "col": 5,
            "key": "team1",
            "label": "氏名１の団体名",
            "type": "text"
          },
          {
            "col": 6,
            "key": "team2",
            "label": "氏名２の団体名",
            "type": "text"
          },
          {
            "col": 7,
            "key": "extra1",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "ミックス",
            "fee": 1000
          },
          {
            "name": "一般男子",
            "fee": 1000
          },
          {
            "name": "一般女子",
            "fee": 1000
          },
          {
            "name": "高校男子",
            "fee": 800
          },
          {
            "name": "高校女子",
            "fee": 800
          },
          {
            "name": "中学男子",
            "fee": 800
          },
          {
            "name": "中学女子",
            "fee": 800
          },
          {
            "name": "小学男子",
            "fee": 800
          },
          {
            "name": "小学女子",
            "fee": 800
          }
        ]
      }
    ],
    "extras": [],
    "description": "シングルス（男子・女子） / ダブルス（男子・女子）"
  },
  {
    "id": "junior",
    "file": "junior.xlsx",
    "name": "釧路ジュニア選手権 (兼北海道選手権地区予選会)",
    "team_info": {
      "sheet": "団体名等入力",
      "row": 3,
      "cells": {
        "team_name": {
          "col": 2,
          "row": 3
        },
        "responsible": {
          "col": 3,
          "row": 3
        },
        "phone": {
          "col": 4,
          "row": 3
        }
      },
      "coaches": [
        {
          "row": 7,
          "col": 2,
          "label": "顧問"
        },
        {
          "row": 7,
          "col": 3,
          "label": "コーチ"
        },
        {
          "row": 7,
          "col": 4,
          "label": "コーチ"
        }
      ]
    },
    "events": [
      {
        "id": "event_1",
        "sheet": "男女シングルス",
        "title": "シングルス（男子・女子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "全道大会 参加意思",
            "type": "text"
          },
          {
            "col": 6,
            "key": "extra2",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "一般男子",
            "fee": 700
          },
          {
            "name": "一般女子",
            "fee": 700
          },
          {
            "name": "高校男子",
            "fee": 500
          },
          {
            "name": "高校女子",
            "fee": 500
          },
          {
            "name": "13歳男子（中学1年）以下",
            "fee": 500
          },
          {
            "name": "13歳女子（中学1年）以下",
            "fee": 500
          },
          {
            "name": "14歳男子（中学2年）以下",
            "fee": 500
          },
          {
            "name": "14歳女子（中学2年）以下",
            "fee": 500
          },
          {
            "name": "ジュニア選手権男子",
            "fee": 500
          },
          {
            "name": "ジュニア選手権女子",
            "fee": 500
          }
        ]
      }
    ],
    "extras": [],
    "description": "シングルス（男子・女子）"
  },
  {
    "id": "nagoyaka",
    "file": "nagoyaka.xlsx",
    "name": "第１８回　なごやか亭杯くしろオープン／\n第１３回　ＰＭシニアオープン",
    "team_info": {
      "sheet": "団体名等入力",
      "row": 3,
      "cells": {
        "team_name": {
          "col": 2,
          "row": 3
        },
        "responsible": {
          "col": 3,
          "row": 3
        },
        "phone": {
          "col": 4,
          "row": 3
        }
      },
      "coaches": [
        {
          "row": 6,
          "col": 2,
          "label": "顧問"
        },
        {
          "row": 6,
          "col": 3,
          "label": "コーチ"
        },
        {
          "row": 6,
          "col": 4,
          "label": "コーチ"
        }
      ]
    },
    "events": [
      {
        "id": "event_1",
        "sheet": "男女シングルス",
        "title": "シングルス（男子・女子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "支部名",
            "type": "text"
          },
          {
            "col": 6,
            "key": "extra2",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "一般男子",
            "fee": 700
          },
          {
            "name": "一般女子",
            "fee": 700
          },
          {
            "name": "高校男子",
            "fee": 500
          },
          {
            "name": "高校女子",
            "fee": 500
          },
          {
            "name": "中学男子",
            "fee": 500
          },
          {
            "name": "中学女子",
            "fee": 500
          },
          {
            "name": "小学男子",
            "fee": 500
          },
          {
            "name": "小学女子",
            "fee": 500
          }
        ]
      },
      {
        "id": "event_2",
        "sheet": "男女ダブルス",
        "title": "ダブルス（男子・女子）",
        "type": "doubles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name1",
            "label": "氏名１",
            "type": "text"
          },
          {
            "col": 4,
            "key": "name2",
            "label": "氏名２",
            "type": "text"
          },
          {
            "col": 5,
            "key": "team1",
            "label": "氏名１の団体名",
            "type": "text"
          },
          {
            "col": 6,
            "key": "team2",
            "label": "氏名２の団体名",
            "type": "text"
          },
          {
            "col": 7,
            "key": "extra1",
            "label": "支部名",
            "type": "text"
          },
          {
            "col": 8,
            "key": "extra2",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "ミックス",
            "fee": 1000
          },
          {
            "name": "一般男子",
            "fee": 1000
          },
          {
            "name": "一般女子",
            "fee": 1000
          },
          {
            "name": "高校男子",
            "fee": 800
          },
          {
            "name": "高校女子",
            "fee": 800
          },
          {
            "name": "中学男子",
            "fee": 800
          },
          {
            "name": "中学女子",
            "fee": 800
          },
          {
            "name": "小学男子",
            "fee": 800
          },
          {
            "name": "小学女子",
            "fee": 800
          }
        ]
      },
      {
        "id": "event_3",
        "sheet": "ＰＭシニア男女",
        "title": "シングルス（男子・女子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "支部名",
            "type": "text"
          },
          {
            "col": 6,
            "key": "extra2",
            "label": "年齢 （５０歳以上）",
            "type": "text"
          },
          {
            "col": 7,
            "key": "extra3",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "一般男子",
            "fee": 700
          },
          {
            "name": "一般女子",
            "fee": 700
          }
        ]
      }
    ],
    "extras": [],
    "description": "シングルス（男子・女子） / ダブルス（男子・女子） / シングルス（男子・女子）"
  },
  {
    "id": "tancho",
    "file": "tancho.xlsx",
    "name": "第4回Nittaku杯全国タンチョウオープン\n（ラージボール）",
    "team_info": {
      "sheet": "団体名等入力",
      "row": 3,
      "cells": {
        "team_name": {
          "col": 2,
          "row": 3
        },
        "responsible": {
          "col": 3,
          "row": 3
        },
        "phone": {
          "col": 4,
          "row": 3
        }
      },
      "coaches": [
        {
          "row": 6,
          "col": 2,
          "label": "顧問"
        },
        {
          "row": 6,
          "col": 3,
          "label": "コーチ"
        },
        {
          "row": 6,
          "col": 4,
          "label": "コーチ"
        }
      ]
    },
    "events": [
      {
        "id": "event_1",
        "sheet": "男女シングルス",
        "title": "シングルス（男子、女子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 6,
            "key": "extra2",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "一般男子（49歳以下）",
            "fee": 1000
          },
          {
            "name": "男子50歳代",
            "fee": 1000
          },
          {
            "name": "男子60歳代",
            "fee": 1000
          },
          {
            "name": "男子70歳代",
            "fee": 1000
          },
          {
            "name": "男子80歳以上",
            "fee": 1000
          },
          {
            "name": "一般女子（49歳以下）",
            "fee": 1000
          },
          {
            "name": "女子50歳代",
            "fee": 1000
          },
          {
            "name": "女子60歳代",
            "fee": 1000
          },
          {
            "name": "女子70歳代",
            "fee": 1000
          },
          {
            "name": "女子80歳以上",
            "fee": 1000
          }
        ]
      },
      {
        "id": "event_2",
        "sheet": "ＰＭカデット（男）",
        "title": "シングルス（男子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "年齢 （中学2年以下）",
            "type": "text"
          },
          {
            "col": 6,
            "key": "extra2",
            "label": "登録/未登録",
            "type": "text"
          }
        ],
        "categories": []
      },
      {
        "id": "event_3",
        "sheet": "ＰＭカデット（女）",
        "title": "シングルス（女子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "年齢 （中学2年以下）",
            "type": "text"
          },
          {
            "col": 6,
            "key": "extra2",
            "label": "登録/未登録",
            "type": "text"
          }
        ],
        "categories": []
      },
      {
        "id": "event_4",
        "sheet": "男女,ミックスダブルス",
        "title": "ダブルス（混合、男子、女子）",
        "type": "doubles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 4,
            "key": "name2",
            "label": "氏名２",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "混合（119歳以下）",
            "fee": 2000
          },
          {
            "name": "混合（120歳代）",
            "fee": 2000
          },
          {
            "name": "混合（130歳代）",
            "fee": 2000
          },
          {
            "name": "混合（140歳代）",
            "fee": 2000
          },
          {
            "name": "混合（150歳代）",
            "fee": 2000
          },
          {
            "name": "混合（160歳以上）",
            "fee": 2000
          },
          {
            "name": "男子（119歳以下）",
            "fee": 2000
          },
          {
            "name": "男子（120歳代）",
            "fee": 2000
          },
          {
            "name": "男子（130歳代）",
            "fee": 2000
          },
          {
            "name": "男子（140歳代）",
            "fee": 2000
          },
          {
            "name": "男子（150歳代）",
            "fee": 2000
          },
          {
            "name": "男子（160歳以上）",
            "fee": 2000
          },
          {
            "name": "女子（119歳以下）",
            "fee": 2000
          },
          {
            "name": "女子（120歳代）",
            "fee": 2000
          },
          {
            "name": "女子（130歳代）",
            "fee": 2000
          },
          {
            "name": "女子（140歳代）",
            "fee": 2000
          },
          {
            "name": "女子（150歳代）",
            "fee": 2000
          },
          {
            "name": "女子（160歳以上）",
            "fee": 2000
          }
        ]
      }
    ],
    "extras": [],
    "description": "シングルス（男子、女子） / シングルス（男子） / シングルス（女子） / ダブルス（混合、男子、女子）"
  },
  {
    "id": "chugaku_senbatsu",
    "file": "chugaku_senbatsu.xlsx",
    "name": "中学選抜卓球大会（団体戦）",
    "team_info": {
      "sheet": "団体名等入力",
      "row": 3,
      "cells": {
        "team_name": {
          "col": 2,
          "row": 3
        },
        "responsible": {
          "col": 3,
          "row": 3
        },
        "phone": {
          "col": 4,
          "row": 3
        }
      },
      "coaches": [
        {
          "row": 6,
          "col": 2,
          "label": "顧問"
        },
        {
          "row": 6,
          "col": 3,
          "label": "コーチ"
        },
        {
          "row": 6,
          "col": 4,
          "label": "コーチ"
        }
      ]
    },
    "events": [
      {
        "id": "event_1",
        "sheet": "団体（男・女）",
        "title": "団体（男子・女子）",
        "type": "team",
        "category_col": 2,
        "start_row": 5,
        "end_row": 24,
        "fields": [
          {
            "col": 3,
            "key": "team",
            "label": "チーム名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "member1",
            "label": "氏名1",
            "type": "text"
          },
          {
            "col": 5,
            "key": "member2",
            "label": "氏名2",
            "type": "text"
          },
          {
            "col": 6,
            "key": "member3",
            "label": "氏名3",
            "type": "text"
          },
          {
            "col": 7,
            "key": "member4",
            "label": "氏名4",
            "type": "text"
          },
          {
            "col": 8,
            "key": "member5",
            "label": "氏名5",
            "type": "text"
          },
          {
            "col": 9,
            "key": "member6",
            "label": "氏名6",
            "type": "text"
          },
          {
            "col": 10,
            "key": "member7",
            "label": "氏名7",
            "type": "text"
          },
          {
            "col": 11,
            "key": "member8",
            "label": "氏名8",
            "type": "text"
          },
          {
            "col": 12,
            "key": "registered",
            "label": "登録/未登録",
            "type": "select",
            "options": [
              "登録",
              "未登録"
            ]
          }
        ],
        "categories": [
          {
            "name": "一般男子",
            "fee": 700
          },
          {
            "name": "一般女子",
            "fee": 700
          }
        ]
      }
    ],
    "extras": [],
    "description": "団体（男子・女子）"
  },
  {
    "id": "chugaku_shinjin",
    "file": "chugaku_shinjin.xlsx",
    "name": "釧路地区中学新人戦（個人戦）",
    "team_info": {
      "sheet": "団体名等入力",
      "row": 3,
      "cells": {
        "team_name": {
          "col": 2,
          "row": 3
        },
        "responsible": {
          "col": 3,
          "row": 3
        },
        "phone": {
          "col": 4,
          "row": 3
        }
      },
      "coaches": [
        {
          "row": 6,
          "col": 2,
          "label": "顧問"
        },
        {
          "row": 6,
          "col": 3,
          "label": "コーチ"
        },
        {
          "row": 6,
          "col": 4,
          "label": "コーチ"
        }
      ]
    },
    "events": [
      {
        "id": "event_1",
        "sheet": "男女シングルス",
        "title": "シングルス（男子・女子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "全道大会 参加意思",
            "type": "text"
          },
          {
            "col": 6,
            "key": "extra2",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "一般男子",
            "fee": 700
          },
          {
            "name": "一般女子",
            "fee": 700
          },
          {
            "name": "高校男子",
            "fee": 500
          },
          {
            "name": "高校女子",
            "fee": 500
          },
          {
            "name": "13歳男子（中学1年）以下",
            "fee": 500
          },
          {
            "name": "13歳女子（中学1年）以下",
            "fee": 500
          },
          {
            "name": "14歳男子（中学2年）以下",
            "fee": 500
          },
          {
            "name": "14歳女子（中学2年）以下",
            "fee": 500
          },
          {
            "name": "ジュニア選手権男子",
            "fee": 500
          },
          {
            "name": "ジュニア選手権女子",
            "fee": 500
          },
          {
            "name": "中学男子",
            "fee": 500
          },
          {
            "name": "中学女子",
            "fee": 500
          }
        ]
      }
    ],
    "extras": [],
    "description": "シングルス（男子・女子）"
  },
  {
    "id": "league55",
    "file": "league55.xlsx",
    "name": "第５５回くしろリーグ団体選手権",
    "team_info": {
      "sheet": "団体名等入力",
      "row": 3,
      "cells": {
        "team_name": {
          "col": 2,
          "row": 3
        },
        "responsible": {
          "col": 3,
          "row": 3
        },
        "phone": {
          "col": 4,
          "row": 3
        }
      },
      "coaches": [
        {
          "row": 6,
          "col": 2,
          "label": "顧問"
        },
        {
          "row": 6,
          "col": 3,
          "label": "コーチ"
        },
        {
          "row": 6,
          "col": 4,
          "label": "コーチ"
        }
      ]
    },
    "events": [
      {
        "id": "event_1",
        "sheet": "団体",
        "title": "団体",
        "type": "team",
        "category_col": 2,
        "start_row": 5,
        "end_row": 24,
        "fields": [
          {
            "col": 3,
            "key": "team",
            "label": "チーム名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "member1",
            "label": "氏名1",
            "type": "text"
          },
          {
            "col": 5,
            "key": "member2",
            "label": "氏名2",
            "type": "text"
          },
          {
            "col": 6,
            "key": "member3",
            "label": "氏名3",
            "type": "text"
          },
          {
            "col": 7,
            "key": "member4",
            "label": "氏名4",
            "type": "text"
          },
          {
            "col": 8,
            "key": "member5",
            "label": "氏名5",
            "type": "text"
          },
          {
            "col": 9,
            "key": "member6",
            "label": "氏名6",
            "type": "text"
          },
          {
            "col": 10,
            "key": "member7",
            "label": "氏名7",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "一般",
            "fee": 4000
          },
          {
            "name": "小・中・高",
            "fee": 3000
          }
        ]
      }
    ],
    "extras": [],
    "description": "団体"
  },
  {
    "id": "shitsugen",
    "file": "shitsugen.xlsx",
    "name": "第45回　湿原の風オープン選手権／\n第14回　ＰＭシニアオープン",
    "team_info": {
      "sheet": "団体名等入力",
      "row": 3,
      "cells": {
        "team_name": {
          "col": 2,
          "row": 3
        },
        "responsible": {
          "col": 3,
          "row": 3
        },
        "phone": {
          "col": 4,
          "row": 3
        }
      },
      "coaches": [
        {
          "row": 6,
          "col": 2,
          "label": "顧問"
        },
        {
          "row": 6,
          "col": 3,
          "label": "コーチ"
        },
        {
          "row": 6,
          "col": 4,
          "label": "コーチ"
        }
      ]
    },
    "events": [
      {
        "id": "event_1",
        "sheet": "男女シングルス",
        "title": "シングルス（男子・女子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "支部名",
            "type": "text"
          },
          {
            "col": 6,
            "key": "extra2",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "一般男子",
            "fee": 700
          },
          {
            "name": "一般女子",
            "fee": 700
          },
          {
            "name": "高校男子",
            "fee": 500
          },
          {
            "name": "高校女子",
            "fee": 500
          },
          {
            "name": "中学男子",
            "fee": 500
          },
          {
            "name": "中学女子",
            "fee": 500
          },
          {
            "name": "小学男子",
            "fee": 500
          },
          {
            "name": "小学女子",
            "fee": 500
          }
        ]
      },
      {
        "id": "event_2",
        "sheet": "男女ダブルス",
        "title": "ダブルス（男子・女子）",
        "type": "doubles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name1",
            "label": "氏名１",
            "type": "text"
          },
          {
            "col": 4,
            "key": "name2",
            "label": "氏名２",
            "type": "text"
          },
          {
            "col": 5,
            "key": "team1",
            "label": "氏名１の団体名",
            "type": "text"
          },
          {
            "col": 6,
            "key": "team2",
            "label": "氏名２の団体名",
            "type": "text"
          },
          {
            "col": 7,
            "key": "extra1",
            "label": "支部名",
            "type": "text"
          },
          {
            "col": 8,
            "key": "extra2",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "ミックス",
            "fee": 1000
          },
          {
            "name": "一般男子",
            "fee": 1000
          },
          {
            "name": "一般女子",
            "fee": 1000
          },
          {
            "name": "高校男子",
            "fee": 800
          },
          {
            "name": "高校女子",
            "fee": 800
          },
          {
            "name": "中学男子",
            "fee": 800
          },
          {
            "name": "中学女子",
            "fee": 800
          },
          {
            "name": "小学男子",
            "fee": 800
          },
          {
            "name": "小学女子",
            "fee": 800
          }
        ]
      },
      {
        "id": "event_3",
        "sheet": "ＰＭシニア男女",
        "title": "シングルス（男子・女子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "支部名",
            "type": "text"
          },
          {
            "col": 6,
            "key": "extra2",
            "label": "年齢 （５５歳以上）",
            "type": "text"
          },
          {
            "col": 7,
            "key": "extra3",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "一般男子",
            "fee": 700
          },
          {
            "name": "一般女子",
            "fee": 700
          }
        ]
      }
    ],
    "extras": [],
    "description": "シングルス（男子・女子） / ダブルス（男子・女子） / シングルス（男子・女子）"
  },
  {
    "id": "doubles_team",
    "file": "doubles_team.xlsx",
    "name": "第32回バタフライダブルスチームカップ年代別・学年別選手権",
    "team_info": {
      "sheet": "団体名等入力",
      "row": 3,
      "cells": {
        "team_name": {
          "col": 2,
          "row": 3
        },
        "responsible": {
          "col": 3,
          "row": 3
        },
        "phone": {
          "col": 4,
          "row": 3
        }
      },
      "coaches": []
    },
    "events": [
      {
        "id": "event_1",
        "sheet": "男女団体",
        "title": "団体（男子・女子）",
        "type": "team",
        "category_col": 2,
        "start_row": 5,
        "end_row": 24,
        "fields": [
          {
            "col": 3,
            "key": "team",
            "label": "チーム名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "member1",
            "label": "氏名1",
            "type": "text"
          },
          {
            "col": 5,
            "key": "member2",
            "label": "氏名2",
            "type": "text"
          },
          {
            "col": 6,
            "key": "member3",
            "label": "氏名3",
            "type": "text"
          },
          {
            "col": 7,
            "key": "member4",
            "label": "氏名4",
            "type": "text"
          },
          {
            "col": 8,
            "key": "member5",
            "label": "氏名5",
            "type": "text"
          },
          {
            "col": 9,
            "key": "member6",
            "label": "氏名6",
            "type": "text"
          },
          {
            "col": 14,
            "key": "registered",
            "label": "登録/未登録",
            "type": "select",
            "options": [
              "登録",
              "未登録"
            ]
          }
        ],
        "categories": [
          {
            "name": "一般男子",
            "fee": 2000
          },
          {
            "name": "一般女子",
            "fee": 2000
          },
          {
            "name": "高校男子",
            "fee": 2000
          },
          {
            "name": "高校女子",
            "fee": 2000
          },
          {
            "name": "中学男子",
            "fee": 2000
          },
          {
            "name": "中学女子",
            "fee": 2000
          },
          {
            "name": "小学男子",
            "fee": 2000
          },
          {
            "name": "小学女子",
            "fee": 2000
          }
        ]
      },
      {
        "id": "event_2",
        "sheet": "男女シングルス",
        "title": "シングルス（男子・女子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "エントリーの年代",
            "type": "text"
          },
          {
            "col": 6,
            "key": "extra2",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "一般男子",
            "fee": 700
          },
          {
            "name": "一般女子",
            "fee": 700
          },
          {
            "name": "高校1・2年男子",
            "fee": 500
          },
          {
            "name": "高校1・2年女子",
            "fee": 500
          },
          {
            "name": "中学1・2年男子",
            "fee": 500
          },
          {
            "name": "中学1・2年女子",
            "fee": 500
          },
          {
            "name": "小学以下男子",
            "fee": 500
          },
          {
            "name": "小学以下女子",
            "fee": 500
          }
        ]
      },
      {
        "id": "event_3",
        "sheet": "ダブルス",
        "title": "ダブルス",
        "type": "doubles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name1",
            "label": "氏名１",
            "type": "text"
          },
          {
            "col": 5,
            "key": "team1",
            "label": "氏名2",
            "type": "text"
          },
          {
            "col": 7,
            "key": "extra1",
            "label": "団体名（氏名１）",
            "type": "text"
          },
          {
            "col": 8,
            "key": "extra2",
            "label": "団体名（氏名２）",
            "type": "text"
          }
        ],
        "categories": []
      }
    ],
    "extras": [],
    "description": "団体（男子・女子） / シングルス（男子・女子） / ダブルス"
  },
  {
    "id": "hopes",
    "file": "hopes.xlsx",
    "name": "ホープス・カブ・バンビ地区予選会/\nホープス団体予選会",
    "team_info": {
      "sheet": "団体名等入力",
      "row": 3,
      "cells": {
        "team_name": {
          "col": 2,
          "row": 3
        },
        "responsible": {
          "col": 3,
          "row": 3
        },
        "phone": {
          "col": 4,
          "row": 3
        }
      },
      "coaches": [
        {
          "row": 7,
          "col": 2,
          "label": "顧問"
        },
        {
          "row": 7,
          "col": 3,
          "label": "コーチ"
        },
        {
          "row": 7,
          "col": 4,
          "label": "コーチ"
        }
      ]
    },
    "events": [
      {
        "id": "event_1",
        "sheet": "ホープス団体男女",
        "title": "ホープス団体（男子・女子）",
        "type": "team",
        "category_col": 2,
        "start_row": 5,
        "end_row": 24,
        "fields": [
          {
            "col": 3,
            "key": "team",
            "label": "チーム名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "member1",
            "label": "氏名1",
            "type": "text"
          },
          {
            "col": 5,
            "key": "member2",
            "label": "氏名2",
            "type": "text"
          },
          {
            "col": 6,
            "key": "member3",
            "label": "氏名3",
            "type": "text"
          },
          {
            "col": 7,
            "key": "member4",
            "label": "氏名4",
            "type": "text"
          },
          {
            "col": 8,
            "key": "member5",
            "label": "氏名5",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "団体男子",
            "fee": 2000
          },
          {
            "name": "団体女子",
            "fee": 2000
          }
        ]
      },
      {
        "id": "event_2",
        "sheet": "シングルス男女",
        "title": "シングルス（男子・女子）",
        "type": "singles",
        "category_col": 2,
        "start_row": 5,
        "end_row": 44,
        "fields": [
          {
            "col": 3,
            "key": "name",
            "label": "氏名",
            "type": "text"
          },
          {
            "col": 4,
            "key": "team",
            "label": "団体名",
            "type": "text"
          },
          {
            "col": 5,
            "key": "extra1",
            "label": "備考",
            "type": "text"
          }
        ],
        "categories": [
          {
            "name": "ホープス男子（新小６以下）",
            "fee": 500
          },
          {
            "name": "ホープス女子（新小６以下）",
            "fee": 500
          },
          {
            "name": "カブ男子（新小４以下）",
            "fee": 500
          },
          {
            "name": "カブ女子（新小４以下）",
            "fee": 500
          },
          {
            "name": "バンビ男子（新小２以下）",
            "fee": 500
          },
          {
            "name": "バンビ女子（新小２以下）",
            "fee": 500
          }
        ]
      }
    ],
    "extras": [],
    "description": "ホープス団体（男子・女子） / シングルス（男子・女子）"
  }
];

export const tournamentById = (id) => tournaments.find(t => t.id === id);
