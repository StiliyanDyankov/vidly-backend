const getUser = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Reading a user from db");
            resolve({ id: id, gitHubUsername: "mosh" });
        }, 2000);
    });
};

const getRepositories = (username) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Fetching repos of ${username}...`);
            resolve(["repo1", "repo2", "repo3"]);
        }, 2000);
    });
};

const getCommits = (repo) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Calling GitHub API...");
            resolve(["commit"]);
        }, 2000);
    });
};

getUser(1)
    .then((user) => getRepositories(user.gitHubUsername))
    .then((repos)=>getCommits(repos[0]))
    .then((commits)=>console.log('Commits', commits))
    .catch(err => console.log('Error', err.message));

// console.log("1");
// getUser(1, (user) => {
//     console.log("User", user);

//     getRepositories(user.gitHubUsername, (repos) => {
//         console.log(repos);
//     });
// });
// console.log("2");
