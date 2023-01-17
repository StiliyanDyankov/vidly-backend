// // EXCERCISE START

// // getCustomer(1, (customer) => {
// //     console.log("Customer: ", customer);
// //     if (customer.isGold) {
// //         getTopMovies((movies) => {
// //             console.log("Top movies: ", movies);
// //             sendEmail(customer.email, movies, () => {
// //                 console.log("Email sent...");
// //             });
// //         });
// //     }
// // });

// function getCustomer(id, callback) {
//     setTimeout(() => {
//         callback({
//             id: 1,
//             name: "Mosh Hamedani",
//             isGold: true,
//             email: "email",
//         });
//     }, 4000);
// }

// function getTopMovies(callback) {
//     setTimeout(() => {
//         callback(["movie1", "movie2"]);
//     }, 4000);
// }

// function sendEmail(email, movies, callback) {
//     setTimeout(() => {
//         callback();
//     }, 4000);
// }

// MOSH SOLUTION

// getCustomer(1, (customer) => {
//     console.log("Customer: ", customer);
//     if (customer.isGold) {
//         getTopMovies((movies) => {
//             console.log("Top movies: ", movies);
//             sendEmail(customer.email, movies, () => {
//                 console.log("Email sent...");
//             });
//         });
//     }
// });

// async function notifyCustomer() {
//     const customer = await getCustomer(1);
//     console.log("Customer: ", customer);
//     if (customer.isGold) {
//         const movies = await getTopMovies();
//         console.log("Top movies: ", movies);
//         await sendEmail(customer.email, movies);
//         console.log("Email sent...");
//     }
// }

// notifyCustomer();

// function getCustomer(id) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve({
//                 id: 1,
//                 name: "Mosh Hamedani",
//                 isGold: true,
//                 email: "email",
//             });
//         }, 4000);
//     });
// }

// function getTopMovies(callback) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(["movie1", "movie2"]);
//         }, 4000);
//     });
// }

// function sendEmail(email, movies) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve();
//         }, 4000);
//     });
// }

// MY SOLUTION

// async function getCustomer(id) {
//     setTimeout(() => {
//         const customer = {
//             id: 1,
//             name: "Mosh Hamedani",
//             isGold: true,
//             email: "email",
//         };
//         console.log("Customer: ", customer);
//         return customer;
//     }, 4000);
// }

// async function getTopMovies(customer) {
//     setTimeout(() => {
//         if (customer.isGold) {
//             const movies = ["movie1", "movie2"];
//             console.log("Top movies: ", movies);
//             return movies;
//         }
//     }, 4000);
// }

// async function sendEmail(email, movies) {
//     setTimeout(() => {
//         console.log("Email sent...");
//     }, 4000);
// }

// const customer = await getCustomer(1);
// const topMovies = await getTopMovies(customer);
// sendEmail(customer.email, topMovies);

const returnOne = async () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(1);
        }, 2000);
    });
};

const returnTwo = async () => {
    setTimeout(() => {}, 2000);
    console.log("two secs have gone by");
	return 2;
};

const displayNums = async () => {
    console.log("start");
    const num = await returnOne();
    console.log(num);
	const two  = await returnTwo();
	console.log(two);
    console.log(4);
	return [1,2,3];
};

// displayNums();
const displayArray = async () => {
	const arr = await displayNums();
	console.log(arr);
}

displayArray();