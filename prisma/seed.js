const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

// async function loadMovieData() {
//     return movieData.map((movie) => {
//         return {
//             data: {
//                 title: movie.title,
//                 vote: movie.vote_average,
//                 description: movie.overview,
//                 image: movie.poster_path,
//                 releaseDate: movie.release_date
//             }
//         }
//     })
// }
const movieData = [
    {
        title: "Godzilla vs. Kong",
        description: "In a time when monsters walk the Earth, humanity’s fight for its future sets Godzilla and Kong on a collision course that will see the two most powerful forces of nature on the planet collide in a spectacular battle for the ages.",
        image: "/pgqgaUx1cJb5oZQQ5v0tNARCeBp.jpg",
        releaseDate: new Date(("2021-03-24")),
        watched: false,
        // vote: 8.3,
    },
    {
        title: "Zack Snyder's Justice League",
        description: "Determined to ensure Superman's ultimate sacrifice was not in vain, Bruce Wayne aligns forces with Diana Prince with plans to recruit a team of metahumans to protect the world from an approaching threat of catastrophic proportions.",
        image: "/tnAuB8q5vv7Ax9UAEje5Xi4BXik.jpg",
        releaseDate: new Date("2021-03-18"),
        watched: false,
        // vote: 8.5
    }
]

async function main() {
    console.log(`Start seeding ...`)
    for (const move of movieData) {
        const movie = await prisma.movie.create({
            data: move,
        })
        console.log(`Created movie with id: ${movie.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
