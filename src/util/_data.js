/**
 * sd data
 */

const startData = {
  'nodes': [
    [{
      'id': '0_$AppClick',
      'event_name': '$AppClick',
      'times': 5092
    }],
    [{
      'id': '1_$AppViewScreen',
      'event_name': '$AppViewScreen',
      'times': 3784
    }, {
      'id': '1_$WebClick',
      'event_name': '$WebClick',
      'times': 160
    }, {
      'id': '1_$AppClick',
      'event_name': '$AppClick',
      'times': 132
    }],
    [{
      'id': '2_$WebClick',
      'event_name': '$WebClick',
      'times': 3332
    }, {
      'id': '2_$AppViewScreen',
      'event_name': '$AppViewScreen',
      'times': 284
    }, {
      'id': '2_$AppClick',
      'event_name': '$AppClick',
      'times': 60
    }],
    [{
      'id': '3_$WebClick',
      'event_name': '$WebClick',
      'times': 504
    }, {
      'id': '3_$AppClick',
      'event_name': '$AppClick',
      'times': 376
    }, {
      'id': '3_$AppViewScreen',
      'event_name': '$AppViewScreen',
      'times': 216
    }],
    [{
      'id': '4_$AppViewScreen',
      'event_name': '$AppViewScreen',
      'times': 716
    }, {
      'id': '4_$WebClick',
      'event_name': '$WebClick',
      'times': 92
    }, {
      'id': '4_$AppClick',
      'event_name': '$AppClick',
      'times': 28
    }],
    [{
      'id': '5_$WebClick',
      'event_name': '$WebClick',
      'times': 276
    }, {
      'id': '5_$AppViewScreen',
      'event_name': '$AppViewScreen',
      'times': 84
    }, {
      'id': '5_$AppClick',
      'event_name': '$AppClick',
      'times': 56
    }],
    [{
      'id': '6_$AppViewScreen',
      'event_name': '$AppViewScreen',
      'times': 92
    }, {
      'id': '6_$WebClick',
      'event_name': '$WebClick',
      'times': 40
    }, {
      'id': '6_$AppClick',
      'event_name': '$AppClick',
      'times': 4
    }],
    [{
      'id': '7_$WebClick',
      'event_name': '$WebClick',
      'times': 44
    }, {
      'id': '7_$AppViewScreen',
      'event_name': '$AppViewScreen',
      'times': 32
    }, {
      'id': '7_$AppClick',
      'event_name': '$AppClick',
      'times': 12
    }],
    [{
      'id': '8_$AppViewScreen',
      'event_name': '$AppViewScreen',
      'times': 12
    }, {
      'id': '8_$AppClick',
      'event_name': '$AppClick',
      'times': 8
    }, {
      'id': '8_$WebClick',
      'event_name': '$WebClick',
      'times': 4
    }],
    [{
      'id': '9_$AppViewScreen',
      'event_name': '$AppViewScreen',
      'times': 4
    }],
    [{
      'id': '10_$WebClick',
      'event_name': '$WebClick',
      'times': 4
    }]
  ],
  'links': [
    [{
      'source': '0_$AppClick',
      'target': '1_$AppViewScreen',
      'times': 3784
    }, {
      'source': '0_$AppClick',
      'target': '1_wastage',
      'is_wastage': true,
      'times': 1016
    }, {
      'source': '0_$AppClick',
      'target': '1_$WebClick',
      'times': 160
    }, {
      'source': '0_$AppClick',
      'target': '1_$AppClick',
      'times': 132
    }],
    [{
      'source': '1_$AppViewScreen',
      'target': '2_$WebClick',
      'times': 3332
    }, {
      'source': '1_$AppViewScreen',
      'target': '2_wastage',
      'is_wastage': true,
      'times': 388
    }, {
      'source': '1_$AppViewScreen',
      'target': '2_$AppClick',
      'times': 48
    }, {
      'source': '1_$AppViewScreen',
      'target': '2_$AppViewScreen',
      'times': 16
    }, {
      'source': '1_$WebClick',
      'target': '2_$AppViewScreen',
      'times': 160
    }, {
      'source': '1_$AppClick',
      'target': '2_$AppViewScreen',
      'times': 108
    }, {
      'source': '1_$AppClick',
      'target': '2_$AppClick',
      'times': 12
    }, {
      'source': '1_$AppClick',
      'target': '2_wastage',
      'is_wastage': true,
      'times': 12
    }],
    [{
      'source': '2_$WebClick',
      'target': '3_wastage',
      'is_wastage': true,
      'times': 2412
    }, {
      'source': '2_$WebClick',
      'target': '3_$WebClick',
      'times': 396
    }, {
      'source': '2_$WebClick',
      'target': '3_$AppClick',
      'times': 356
    }, {
      'source': '2_$WebClick',
      'target': '3_$AppViewScreen',
      'times': 168
    }, {
      'source': '2_$AppViewScreen',
      'target': '3_wastage',
      'is_wastage': true,
      'times': 164
    }, {
      'source': '2_$AppViewScreen',
      'target': '3_$WebClick',
      'times': 104
    }, {
      'source': '2_$AppViewScreen',
      'target': '3_$AppClick',
      'times': 16
    }, {
      'source': '2_$AppClick',
      'target': '3_$AppViewScreen',
      'times': 48
    }, {
      'source': '2_$AppClick',
      'target': '3_$AppClick',
      'times': 4
    }, {
      'source': '2_$AppClick',
      'target': '3_wastage',
      'is_wastage': true,
      'times': 4
    }, {
      'source': '2_$AppClick',
      'target': '3_$WebClick',
      'times': 4
    }],
    [{
      'source': '3_$WebClick',
      'target': '4_$AppViewScreen',
      'times': 420
    }, {
      'source': '3_$WebClick',
      'target': '4_wastage',
      'is_wastage': true,
      'times': 64
    }, {
      'source': '3_$WebClick',
      'target': '4_$WebClick',
      'times': 12
    }, {
      'source': '3_$WebClick',
      'target': '4_$AppClick',
      'times': 8
    }, {
      'source': '3_$AppClick',
      'target': '4_$AppViewScreen',
      'times': 296
    }, {
      'source': '3_$AppClick',
      'target': '4_wastage',
      'is_wastage': true,
      'times': 56
    }, {
      'source': '3_$AppClick',
      'target': '4_$WebClick',
      'times': 20
    }, {
      'source': '3_$AppClick',
      'target': '4_$AppClick',
      'times': 4
    }, {
      'source': '3_$AppViewScreen',
      'target': '4_wastage',
      'is_wastage': true,
      'times': 140
    }, {
      'source': '3_$AppViewScreen',
      'target': '4_$WebClick',
      'times': 60
    }, {
      'source': '3_$AppViewScreen',
      'target': '4_$AppClick',
      'times': 16
    }],
    [{
      'source': '4_$AppViewScreen',
      'target': '5_wastage',
      'is_wastage': true,
      'times': 380
    }, {
      'source': '4_$AppViewScreen',
      'target': '5_$WebClick',
      'times': 268
    }, {
      'source': '4_$AppViewScreen',
      'target': '5_$AppClick',
      'times': 56
    }, {
      'source': '4_$AppViewScreen',
      'target': '5_$AppViewScreen',
      'times': 12
    }, {
      'source': '4_$WebClick',
      'target': '5_$AppViewScreen',
      'times': 48
    }, {
      'source': '4_$WebClick',
      'target': '5_wastage',
      'is_wastage': true,
      'times': 36
    }, {
      'source': '4_$WebClick',
      'target': '5_$WebClick',
      'times': 8
    }, {
      'source': '4_$AppClick',
      'target': '5_$AppViewScreen',
      'times': 24
    }, {
      'source': '4_$AppClick',
      'target': '5_wastage',
      'is_wastage': true,
      'times': 4
    }],
    [{
      'source': '5_$WebClick',
      'target': '6_wastage',
      'is_wastage': true,
      'times': 192
    }, {
      'source': '5_$WebClick',
      'target': '6_$AppViewScreen',
      'times': 52
    }, {
      'source': '5_$WebClick',
      'target': '6_$WebClick',
      'times': 28
    }, {
      'source': '5_$WebClick',
      'target': '6_$AppClick',
      'times': 4
    }, {
      'source': '5_$AppViewScreen',
      'target': '6_wastage',
      'is_wastage': true,
      'times': 72
    }, {
      'source': '5_$AppViewScreen',
      'target': '6_$WebClick',
      'times': 12
    }, {
      'source': '5_$AppClick',
      'target': '6_$AppViewScreen',
      'times': 40
    }, {
      'source': '5_$AppClick',
      'target': '6_wastage',
      'is_wastage': true,
      'times': 16
    }],
    [{
      'source': '6_$AppViewScreen',
      'target': '7_$WebClick',
      'times': 40
    }, {
      'source': '6_$AppViewScreen',
      'target': '7_wastage',
      'is_wastage': true,
      'times': 40
    }, {
      'source': '6_$AppViewScreen',
      'target': '7_$AppClick',
      'times': 12
    }, {
      'source': '6_$WebClick',
      'target': '7_$AppViewScreen',
      'times': 28
    }, {
      'source': '6_$WebClick',
      'target': '7_wastage',
      'is_wastage': true,
      'times': 8
    }, {
      'source': '6_$WebClick',
      'target': '7_$WebClick',
      'times': 4
    }, {
      'source': '6_$AppClick',
      'target': '7_$AppViewScreen',
      'times': 4
    }],
    [{
      'source': '7_$WebClick',
      'target': '8_wastage',
      'is_wastage': true,
      'times': 36
    }, {
      'source': '7_$WebClick',
      'target': '8_$AppViewScreen',
      'times': 4
    }, {
      'source': '7_$WebClick',
      'target': '8_$AppClick',
      'times': 4
    }, {
      'source': '7_$AppViewScreen',
      'target': '8_wastage',
      'is_wastage': true,
      'times': 24
    }, {
      'source': '7_$AppViewScreen',
      'target': '8_$AppClick',
      'times': 4
    }, {
      'source': '7_$AppViewScreen',
      'target': '8_$WebClick',
      'times': 4
    }, {
      'source': '7_$AppClick',
      'target': '8_$AppViewScreen',
      'times': 8
    }, {
      'source': '7_$AppClick',
      'target': '8_wastage',
      'is_wastage': true,
      'times': 4
    }],
    [{
      'source': '8_$AppViewScreen',
      'target': '9_wastage',
      'is_wastage': true,
      'times': 12
    }, {
      'source': '8_$AppClick',
      'target': '9_wastage',
      'is_wastage': true,
      'times': 4
    }, {
      'source': '8_$AppClick',
      'target': '9_$AppViewScreen',
      'times': 4
    }, {
      'source': '8_$WebClick',
      'target': '9_wastage',
      'is_wastage': true,
      'times': 4
    }],
    [{
      'source': '9_$AppViewScreen',
      'target': '10_$WebClick',
      'times': 4
    }],
    [{
      'source': '10_$WebClick',
      'target': '11_wastage',
      'is_wastage': true,
      'times': 4
    }]
  ],
  'truncate_row': [],
  'truncate_col': false,
  'report_update_time': '2018-06-13 16:18:42.911',
  'data_update_time': '2018-02-28 00:01:48.000',
  'data_sufficient_update_time': '2018-02-28 00:01:48.000',
  'truncated': false,
  'sampling_factor': 16
}

const endData = {
  'nodes': [
    [{
      'id': '0_$AppClick',
      'event_name': '$AppClick',
      'times': 8
    }],
    [{
      'id': '1_$AppClick',
      'event_name': '$AppClick',
      'times': 12
    }, {
      'id': '1_$AppViewScreen',
      'event_name': '$AppViewScreen',
      'times': 8
    }, {
      'id': '1_$WebClick',
      'event_name': '$WebClick',
      'times': 8
    }],
    [{
      'id': '2_$AppViewScreen',
      'event_name': '$AppViewScreen',
      'times': 20
    }, {
      'id': '2_$WebClick',
      'event_name': '$WebClick',
      'times': 20
    }, {
      'id': '2_$AppClick',
      'event_name': '$AppClick',
      'times': 4
    }],
    [{
      'id': '3_$AppClick',
      'event_name': '$AppClick',
      'times': 64
    }, {
      'id': '3_$WebClick',
      'event_name': '$WebClick',
      'times': 40
    }, {
      'id': '3_$AppViewScreen',
      'event_name': '$AppViewScreen',
      'times': 20
    }],
    [{
      'id': '4_$AppViewScreen',
      'event_name': '$AppViewScreen',
      'times': 112
    }, {
      'id': '4_$WebClick',
      'event_name': '$WebClick',
      'times': 52
    }, {
      'id': '4_$AppClick',
      'event_name': '$AppClick',
      'times': 28
    }],
    [{
      'id': '5_$AppClick',
      'event_name': '$AppClick',
      'times': 376
    }, {
      'id': '5_$WebClick',
      'event_name': '$WebClick',
      'times': 96
    }, {
      'id': '5_$AppViewScreen',
      'event_name': '$AppViewScreen',
      'times': 80
    }],
    [{
      'id': '6_$WebClick',
      'event_name': '$WebClick',
      'times': 608
    }, {
      'id': '6_$AppViewScreen',
      'event_name': '$AppViewScreen',
      'times': 396
    }, {
      'id': '6_$AppClick',
      'event_name': '$AppClick',
      'times': 56
    }],
    [{
      'id': '7_$AppViewScreen',
      'event_name': '$AppViewScreen',
      'times': 756
    }, {
      'id': '7_$WebClick',
      'event_name': '$WebClick',
      'times': 356
    }, {
      'id': '7_$AppClick',
      'event_name': '$AppClick',
      'times': 128
    }],
    [{
      'id': '8_$AppClick',
      'event_name': '$AppClick',
      'times': 5092
    }]
  ],
  'links': [
    [{
      'source': '0_$AppClick',
      'target': '1_$AppViewScreen',
      'times': 8
    }],
    [{
      'source': '1_$AppClick',
      'target': '2_$AppViewScreen',
      'times': 12
    }, {
      'source': '1_$AppViewScreen',
      'target': '2_$WebClick',
      'times': 8
    }, {
      'source': '1_$WebClick',
      'target': '2_$AppViewScreen',
      'times': 8
    }],
    [{
      'source': '2_$AppViewScreen',
      'target': '3_$AppClick',
      'times': 12
    }, {
      'source': '2_$AppViewScreen',
      'target': '3_$WebClick',
      'times': 8
    }, {
      'source': '2_$WebClick',
      'target': '3_$AppViewScreen',
      'times': 12
    }, {
      'source': '2_$WebClick',
      'target': '3_$WebClick',
      'times': 4
    }, {
      'source': '2_$WebClick',
      'target': '3_$AppClick',
      'times': 4
    }, {
      'source': '2_$AppClick',
      'target': '3_$AppViewScreen',
      'times': 4
    }],
    [{
      'source': '3_$AppClick',
      'target': '4_$AppViewScreen',
      'times': 64
    }, {
      'source': '3_$WebClick',
      'target': '4_$AppViewScreen',
      'times': 36
    }, {
      'source': '3_$WebClick',
      'target': '4_$WebClick',
      'times': 4
    }, {
      'source': '3_$AppViewScreen',
      'target': '4_$WebClick',
      'times': 16
    }, {
      'source': '3_$AppViewScreen',
      'target': '4_$AppClick',
      'times': 4
    }],
    [{
      'source': '4_$AppViewScreen',
      'target': '5_$WebClick',
      'times': 64
    }, {
      'source': '4_$AppViewScreen',
      'target': '5_$AppClick',
      'times': 48
    }, {
      'source': '4_$WebClick',
      'target': '5_$AppViewScreen',
      'times': 48
    }, {
      'source': '4_$WebClick',
      'target': '5_$AppClick',
      'times': 4
    }, {
      'source': '4_$AppClick',
      'target': '5_$AppViewScreen',
      'times': 20
    }, {
      'source': '4_$AppClick',
      'target': '5_$AppClick',
      'times': 8
    }],
    [{
      'source': '5_$AppClick',
      'target': '6_$AppViewScreen',
      'times': 360
    }, {
      'source': '5_$AppClick',
      'target': '6_$WebClick',
      'times': 12
    }, {
      'source': '5_$AppClick',
      'target': '6_$AppClick',
      'times': 4
    }, {
      'source': '5_$WebClick',
      'target': '6_$WebClick',
      'times': 60
    }, {
      'source': '5_$WebClick',
      'target': '6_$AppViewScreen',
      'times': 32
    }, {
      'source': '5_$WebClick',
      'target': '6_$AppClick',
      'times': 4
    }, {
      'source': '5_$AppViewScreen',
      'target': '6_$WebClick',
      'times': 80
    }],
    [{
      'source': '6_$WebClick',
      'target': '7_$AppViewScreen',
      'times': 604
    }, {
      'source': '6_$WebClick',
      'target': '7_$AppClick',
      'times': 4
    }, {
      'source': '6_$AppViewScreen',
      'target': '7_$WebClick',
      'times': 356
    }, {
      'source': '6_$AppViewScreen',
      'target': '7_$AppClick',
      'times': 32
    }, {
      'source': '6_$AppViewScreen',
      'target': '7_$AppViewScreen',
      'times': 8
    }, {
      'source': '6_$AppClick',
      'target': '7_$AppViewScreen',
      'times': 44
    }, {
      'source': '6_$AppClick',
      'target': '7_$AppClick',
      'times': 12
    }],
    [{
      'source': '7_$AppViewScreen',
      'target': '8_$AppClick',
      'times': 756
    }, {
      'source': '7_$WebClick',
      'target': '8_$AppClick',
      'times': 356
    }, {
      'source': '7_$AppClick',
      'target': '8_$AppClick',
      'times': 128
    }],
    []
  ],
  'truncate_row': [],
  'truncate_col': false,
  'report_update_time': '2018-06-13 16:21:21.821',
  'data_update_time': '2018-02-28 00:01:48.000',
  'data_sufficient_update_time': '2018-02-28 00:01:48.000',
  'truncated': false,
  'sampling_factor': 16
}

export { startData, endData }
