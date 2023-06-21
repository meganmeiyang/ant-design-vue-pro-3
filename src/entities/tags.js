// system product tags
export const FORMFACTORS = [
    {
        key: '0',
        id: 1,
        value: '2FF',
        default: false,
        color: 'blue',
        help: 'Mini-2FF'
    },
    {
        key: '1',
        id: 2,
        value: '3FF',
        default: false,
        color: 'green',
        help: 'Micro-3FF'
    },
    {
        key: '2',
        id: 3,
        value: '4FF',
        default: false,
        color: 'orange',
        help: 'Nano-4FF'
    },
    {
        key: '3',
        id: 4,
        value: '2+3FF',
        default: false,
        color: 'cyan',
        help: '2FF+3FF'
    },
    {
        key: '4',
        id: 5,
        value: '3+4FF',
        default: false,
        color: 'purple',
        help: '3FF+4FF'
    },
    {
        key: '5',
        id: 6,
        value: '2+3+4FF',
        default: true,
        color: 'pink',
        help: 'TrioCut-2FF+3FF+4FF'
    },
    {
        key: '6',
        id: 7,
        value: '5*6',
        default: false,
        color: 'red',
        help: 'MFF2 5*6(mm)'
    },
    {
        key: '7',
        id: 8,
        value: '2*3',
        default: false,
        color: 'red',
        help: 'eSIM MFF2 2*3(mm)'
    }
]

export const TABLEDATA = {
    formfactor: {
        name: 'Form Factor',
        data: FORMFACTORS
    },
    type: {
        name: 'Type',
        data: []
    },
    printing: {
        name: 'Printing',
        data: []
    },
    artwork: {
        name: 'Artwork',
        data: []
    },
    body: {
        name: 'Body',
        data: []
    },
    grade: {
        name: 'Grade',
        data: []
    }
}

// get system tags from TABLEDATA names into an array
export const SYSTEMTAGS = Object.keys(TABLEDATA).map(key => TABLEDATA[key].name)
