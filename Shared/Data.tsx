const CategoryListData = [
    {
        id: 1,
        name: 'Cardiologie',
        value: 'Cardiology cabinet',
        icon: '/cardiology.png'
    },

    {
        id: 2,
        name: 'Diabet',
        value: 'Diabet cabinet',
        icon: '/sugar-blood-level.png'
    },
    {
        id: 3,
        name: 'Dentist',
        value: 'Dentist restaurant',
        icon: '/tooth.png'
    },
    {
        id: 4,
        name: 'Dermatologie',
        value: 'Dermatolog cabinet',
        icon: '/dermatology.png'
    },
    {
        id: 5,
        name: 'Pshiatrie',
        value: 'Psihiatru restaurant',
        icon: '/psychiatry.png'
    },
]

const ratingList = [
    {
        id: 1,
        name: 1,
        icon: '⭐'
    },
    {
        id: 2,
        name: 2,
        icon: '⭐⭐'
    },
    {
        id: 3,
        name: 3,
        icon: '⭐⭐⭐'
    },
    {
        id: 4,
        name: 4,
        icon: '⭐⭐⭐⭐'
    },
    {
        id: 5,
        name: 5,
        icon: '⭐⭐⭐⭐⭐'
    },
]


const benefitsData = [
    {
        title: 'Review-uri autentice',
        description: 'Vezi recenzii de la pacienți reali',
        iconPath: '/review.png', // Înlocuiește cu calea reală a iconiței
    },
    {
        title: 'Programări online ușoare',
        description: 'Programează-te în câteva minute',
        iconPath: '/booking.png',
    },
    {
        title: 'Economisește timp',
        description: 'Programarea este rapidă și simplă',
        iconPath: '/save-time.png',
    },
    // ... alte beneficii
];

export default {
    CategoryListData,
    ratingList,
    benefitsData
}