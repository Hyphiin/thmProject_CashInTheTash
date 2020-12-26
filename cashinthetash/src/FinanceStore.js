import { writable } from 'svelte/store';

export const Finanzen = writable([
    {
        id: 1,
        name: 'WG Liste',
        datum:'19.12.2020',
        userid: 1
    },
    {
        id: 2,
        name: 'Weihnachtsabendessen mit der ganzen Familie <3',
        datum:'20.12.2020',
        userid: 1
    },
    {
        id: 3,
        name: 'Test Liste',
        datum:'20.12.2020',
        userid: 1
    },
    {
        id: 4,
        name: 'Test Liste',
        datum:'20.12.2020',
        userid: 1
    },
    {
        id: 5,
        name: 'Test Liste',
        datum:'20.12.2020',
        userid: 1
    },
    {
        id: 6,
        name: 'Test Liste',
        datum:'20.12.2020',
        userid: 1
    },
    {
        id: 7,
        name: 'Test Liste',
        datum:'20.12.2020',
        userid: 1
    },
]);

export default Finanzen;