export type SensorsApi = typeof sensorsApiSample;
export const sensorsApiSample = {
  '1': {
    state: {
      daylight: false,
      lastupdated: '2021-08-09T18:30:00',
    },
    config: {
      on: true,
      configured: true,
      sunriseoffset: 30,
      sunsetoffset: -30,
    },
    name: 'Daylight',
    type: 'Daylight',
    modelid: 'PHDL00',
    manufacturername: 'Signify Netherlands B.V.',
    swversion: '1.0',
  },
  '13': {
    state: {
      buttonevent: 1002,
      lastupdated: '2021-08-09T17:24:08',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-02-17T10:23:12',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      pending: [],
    },
    name: 'hulfeværelse (Smart button)',
    type: 'ZLLSwitch',
    modelid: 'ROM001',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue Smart button',
    diversityid: '...',
    swversion: '2.30.0_r30777',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: true,
      inputs: [
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 1000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 1001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 1002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 1003,
              eventtype: 'long_release',
            },
          ],
        },
      ],
    },
  },
  '38': {
    state: {
      presence: false,
      lastupdated: '2021-08-09T20:09:01',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-02-17T10:21:28',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      alert: 'none',
      sensitivity: 2,
      sensitivitymax: 2,
      ledindication: false,
      usertest: false,
      pending: [],
    },
    name: 'Badeværelse (motion sensor)',
    type: 'ZLLPresence',
    modelid: 'SML001',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue motion sensor',
    swversion: '6.1.1.27575',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: true,
    },
  },
  '39': {
    state: {
      lightlevel: 0,
      dark: true,
      daylight: false,
      lastupdated: '2021-08-09T22:43:46',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-02-17T10:21:28',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      alert: 'none',
      tholddark: 21812,
      tholdoffset: 7000,
      ledindication: false,
      usertest: false,
      pending: [],
    },
    name: 'Hue ambient light sensor 1',
    type: 'ZLLLightLevel',
    modelid: 'SML001',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue ambient light sensor',
    swversion: '6.1.1.27575',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: false,
    },
  },
  '40': {
    state: {
      temperature: 2042,
      lastupdated: '2021-08-09T22:45:52',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-02-17T10:21:28',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      alert: 'none',
      ledindication: false,
      usertest: false,
      pending: [],
    },
    name: 'Badeværelse sensor',
    type: 'ZLLTemperature',
    modelid: 'SML001',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue temperature sensor',
    swversion: '6.1.1.27575',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: false,
    },
  },
  '45': {
    state: {
      presence: false,
      lastupdated: '2021-08-09T22:04:04',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-02-17T10:21:50',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      alert: 'none',
      sensitivity: 1,
      sensitivitymax: 2,
      ledindication: false,
      usertest: false,
      pending: [],
    },
    name: 'Trappe (motion sensor)',
    type: 'ZLLPresence',
    modelid: 'SML001',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue motion sensor',
    swversion: '6.1.1.27575',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: true,
    },
  },
  '46': {
    state: {
      lightlevel: 0,
      dark: true,
      daylight: false,
      lastupdated: '2021-08-09T22:44:54',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-02-17T10:21:50',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      alert: 'none',
      tholddark: 21028,
      tholdoffset: 7000,
      ledindication: false,
      usertest: false,
      pending: [],
    },
    name: 'Hue ambient light sensor 2',
    type: 'ZLLLightLevel',
    modelid: 'SML001',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue ambient light sensor',
    swversion: '6.1.1.27575',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: false,
    },
  },
  '47': {
    state: {
      temperature: 2074,
      lastupdated: '2021-08-09T22:44:07',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-02-17T10:21:50',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      alert: 'none',
      ledindication: false,
      usertest: false,
      pending: [],
    },
    name: 'Trappe sensor',
    type: 'ZLLTemperature',
    modelid: 'SML001',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue temperature sensor',
    swversion: '6.1.1.27575',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: false,
    },
  },
  '55': {
    state: {
      buttonevent: 1002,
      lastupdated: '2021-08-07T06:54:17',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-03-01T22:47:14',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      pending: [],
    },
    name: 'Køkken #1 (smart button)',
    type: 'ZLLSwitch',
    modelid: 'ROM001',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue Smart button',
    diversityid: '...',
    swversion: '2.30.0_r30777',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: true,
      inputs: [
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 1000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 1001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 1002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 1003,
              eventtype: 'long_release',
            },
          ],
        },
      ],
    },
  },
  '60': {
    state: {
      buttonevent: 1002,
      lastupdated: '2021-08-09T14:16:35',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-03-01T22:53:51',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      pending: [],
    },
    name: 'Køkken #2 (smart button)',
    type: 'ZLLSwitch',
    modelid: 'ROM001',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue Smart button',
    diversityid: '...',
    swversion: '2.30.0_r30777',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: true,
      inputs: [
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 1000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 1001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 1002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 1003,
              eventtype: 'long_release',
            },
          ],
        },
      ],
    },
  },
  '65': {
    state: {
      buttonevent: 4000,
      lastupdated: '2021-08-09T17:24:11',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-03-01T11:40:39',
    },
    config: {
      on: true,
      battery: 94,
      reachable: true,
      pending: [],
    },
    name: 'Vaskezone (dimmer switch)',
    type: 'ZLLSwitch',
    modelid: 'RWL021',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue dimmer switch',
    diversityid: '...',
    swversion: '6.1.1.28573',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: true,
      inputs: [
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 1000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 1001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 1002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 1003,
              eventtype: 'long_release',
            },
          ],
        },
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 2000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 2001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 2002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 2003,
              eventtype: 'long_release',
            },
          ],
        },
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 3000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 3001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 3002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 3003,
              eventtype: 'long_release',
            },
          ],
        },
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 4000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 4001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 4002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 4003,
              eventtype: 'long_release',
            },
          ],
        },
      ],
    },
  },
  '70': {
    state: {
      buttonevent: 1002,
      lastupdated: '2021-08-09T10:54:46',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-03-02T08:33:47',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      pending: [],
    },
    name: 'soveværelse, garderobe (dimmer)',
    type: 'ZLLSwitch',
    modelid: 'RWL021',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue dimmer switch',
    diversityid: '...',
    swversion: '6.1.1.28573',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: true,
      inputs: [
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 1000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 1001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 1002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 1003,
              eventtype: 'long_release',
            },
          ],
        },
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 2000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 2001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 2002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 2003,
              eventtype: 'long_release',
            },
          ],
        },
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 3000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 3001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 3002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 3003,
              eventtype: 'long_release',
            },
          ],
        },
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 4000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 4001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 4002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 4003,
              eventtype: 'long_release',
            },
          ],
        },
      ],
    },
  },
  '77': {
    state: {
      buttonevent: 4002,
      lastupdated: '2021-08-09T17:36:45',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-03-02T08:42:20',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      pending: [],
    },
    name: 'Soveværelse, indgang (dimmer)',
    type: 'ZLLSwitch',
    modelid: 'RWL021',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue dimmer switch',
    diversityid: '...',
    swversion: '6.1.1.28573',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: true,
      inputs: [
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 1000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 1001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 1002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 1003,
              eventtype: 'long_release',
            },
          ],
        },
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 2000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 2001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 2002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 2003,
              eventtype: 'long_release',
            },
          ],
        },
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 3000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 3001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 3002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 3003,
              eventtype: 'long_release',
            },
          ],
        },
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 4000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 4001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 4002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 4003,
              eventtype: 'long_release',
            },
          ],
        },
      ],
    },
  },
  '106': {
    state: {
      buttonevent: 1002,
      lastupdated: '2021-08-09T22:02:44',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-03-07T21:57:50',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      pending: [],
    },
    name: 'Stuen (smart button)',
    type: 'ZLLSwitch',
    modelid: 'ROM001',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue Smart button',
    diversityid: '...',
    swversion: '2.30.0_r30777',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: true,
      inputs: [
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 1000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 1001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 1002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 1003,
              eventtype: 'long_release',
            },
          ],
        },
      ],
    },
  },
  '111': {
    state: {
      presence: false,
      lastupdated: '2021-08-09T22:45:15',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-03-07T21:49:25',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      alert: 'none',
      sensitivity: 2,
      sensitivitymax: 2,
      ledindication: false,
      usertest: false,
      pending: [],
    },
    name: 'Entré (motion sensor)',
    type: 'ZLLPresence',
    modelid: 'SML001',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue motion sensor',
    swversion: '6.1.1.27575',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: true,
    },
  },
  '112': {
    state: {
      lightlevel: 9768,
      dark: true,
      daylight: false,
      lastupdated: '2021-08-09T22:48:08',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-03-07T21:49:25',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      alert: 'none',
      tholddark: 17052,
      tholdoffset: 7000,
      ledindication: false,
      usertest: false,
      pending: [],
    },
    name: 'Hue ambient light sensor 3',
    type: 'ZLLLightLevel',
    modelid: 'SML001',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue ambient light sensor',
    swversion: '6.1.1.27575',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: false,
    },
  },
  '113': {
    state: {
      temperature: 2137,
      lastupdated: '2021-08-09T22:47:21',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-03-07T21:49:25',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      alert: 'none',
      ledindication: false,
      usertest: false,
      pending: [],
    },
    name: 'Entré sensor',
    type: 'ZLLTemperature',
    modelid: 'SML001',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue temperature sensor',
    swversion: '6.1.1.27575',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: false,
    },
  },
  '146': {
    state: {
      buttonevent: 1002,
      lastupdated: '2021-08-09T17:36:39',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-03-17T18:06:05',
    },
    config: {
      on: true,
      battery: 64,
      reachable: true,
      pending: [],
    },
    name: 'Soveværelse, sengen (dimmer)',
    type: 'ZLLSwitch',
    modelid: 'RWL021',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue dimmer switch',
    diversityid: '...',
    swversion: '6.1.1.28573',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: true,
      inputs: [
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 1000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 1001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 1002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 1003,
              eventtype: 'long_release',
            },
          ],
        },
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 2000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 2001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 2002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 2003,
              eventtype: 'long_release',
            },
          ],
        },
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 3000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 3001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 3002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 3003,
              eventtype: 'long_release',
            },
          ],
        },
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 4000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 4001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 4002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 4003,
              eventtype: 'long_release',
            },
          ],
        },
      ],
    },
  },
  '155': {
    state: {
      buttonevent: 1003,
      lastupdated: '2021-08-09T10:29:16',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-03-20T13:43:52',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      pending: [],
    },
    name: 'Entre, stueetage (smart)',
    type: 'ZLLSwitch',
    modelid: 'ROM001',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue Smart button',
    diversityid: '...',
    swversion: '2.30.0_r30777',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: true,
      inputs: [
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 1000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 1001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 1002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 1003,
              eventtype: 'long_release',
            },
          ],
        },
      ],
    },
  },
  '174': {
    state: {
      buttonevent: 1002,
      lastupdated: '2021-08-08T09:08:51',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-03-26T13:57:53',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      pending: [],
    },
    name: 'Hallway [1st floor] (smart)',
    type: 'ZLLSwitch',
    modelid: 'ROM001',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue Smart button',
    diversityid: '...',
    swversion: '2.30.0_r30777',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: true,
      inputs: [
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 1000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 1001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 1002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 1003,
              eventtype: 'long_release',
            },
          ],
        },
      ],
    },
  },
  '233': {
    state: {
      presence: false,
      lastupdated: '2021-08-09T15:43:20',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-07-09T07:57:44',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      alert: 'none',
      sensitivity: 2,
      sensitivitymax: 2,
      ledindication: false,
      usertest: false,
      pending: [],
    },
    name: 'Toilet sensor',
    type: 'ZLLPresence',
    modelid: 'SML001',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue motion sensor',
    swversion: '6.1.1.27575',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: true,
    },
  },
  '234': {
    state: {
      lightlevel: 14350,
      dark: true,
      daylight: false,
      lastupdated: '2021-08-09T22:47:46',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-07-09T07:57:44',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      alert: 'none',
      tholddark: 15232,
      tholdoffset: 7000,
      ledindication: false,
      usertest: false,
      pending: [],
    },
    name: 'Hue ambient light sensor 4',
    type: 'ZLLLightLevel',
    modelid: 'SML001',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue ambient light sensor',
    swversion: '6.1.1.27575',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: false,
    },
  },
  '235': {
    state: {
      temperature: 2031,
      lastupdated: '2021-08-09T22:47:35',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-07-09T07:57:44',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      alert: 'none',
      ledindication: false,
      usertest: false,
      pending: [],
    },
    name: 'Toilet sensor',
    type: 'ZLLTemperature',
    modelid: 'SML001',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue temperature sensor',
    swversion: '6.1.1.27575',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: false,
    },
  },
  '242': {
    state: {
      buttonevent: 1002,
      lastupdated: '2021-08-09T17:09:20',
    },
    swupdate: {
      state: 'noupdates',
      lastinstall: '2021-07-10T14:33:02',
    },
    config: {
      on: true,
      battery: 100,
      reachable: true,
      pending: [],
    },
    name: 'Stue, under trappen',
    type: 'ZLLSwitch',
    modelid: 'ROM001',
    manufacturername: 'Signify Netherlands B.V.',
    productname: 'Hue Smart button',
    diversityid: '...',
    swversion: '2.30.0_r30777',
    uniqueid: '...',
    capabilities: {
      certified: true,
      primary: true,
      inputs: [
        {
          repeatintervals: [800],
          events: [
            {
              buttonevent: 1000,
              eventtype: 'initial_press',
            },
            {
              buttonevent: 1001,
              eventtype: 'repeat',
            },
            {
              buttonevent: 1002,
              eventtype: 'short_release',
            },
            {
              buttonevent: 1003,
              eventtype: 'long_release',
            },
          ],
        },
      ],
    },
  },
};
