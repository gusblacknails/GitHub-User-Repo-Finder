var userCall
var repoCall


function requestData() {

    let user = document.getElementById("searchUser").value
    let user_url = `https://api.github.com/users/${user}`
    let repos_url = `https://api.github.com/users/${user}/repos`

    userCall = new XMLHttpRequest()
    userCall.onreadystatechange = responseUser
    userCall.open("GET", user_url, true)
    userCall.send()
    repoCall = new XMLHttpRequest()
    repoCall.onreadystatechange = responseRepo
    repoCall.open("GET", repos_url, true)
    repoCall.send()
}

function responseUser() {
    if (userCall.readyState == 4 && userCall.status == 200) {
        var changeClasses = document.getElementById("info").classList
        if (changeClasses.contains("ajaxReturnOut")) {
            changeClasses.remove("ajaxReturnOut")
            changeClasses.add("ajaxReturn")
        }

        let jsonResponse = JSON.parse(userCall.responseText)
            // console.log(jsonResponse)
        let outputUser = {}
        outputUser.name = jsonResponse.name
        document.getElementById("fullName").innerHTML = outputUser.name;
        outputUser.avatar = jsonResponse.avatar_url
        document.getElementById("avatar").src = outputUser.avatar;
        // console.log(outputUser.avatar)
        outputUser.login = `@${jsonResponse.login}`
        document.getElementById("login").innerHTML = outputUser.login;
        // console.log(outputUser.login)
        outputUser.bio = jsonResponse.bio
            // console.log(outputUser.bio)
        document.getElementById("bio").innerHTML = outputUser.bio;

    }
}

function responseRepo() {
    if (repoCall.readyState == 4 && repoCall.status == 200) {
        let jsonResponse = JSON.parse(repoCall.responseText)
        console.log(jsonResponse)

        let outputRepo = []
        for (var i = 0; i < jsonResponse.length; i++) { outputRepo.push({}) }
        console.log(outputRepo)

        for (var i in jsonResponse) {
            outputRepo[i].name = jsonResponse[i].name
            console.log(outputRepo[i].name)
            outputRepo[i].stargazers_count = jsonResponse[i].stargazers_count
            console.log(outputRepo[i].stargazers_count)
            outputRepo[i].forks_count = jsonResponse[i].forks_count
            console.log(outputRepo[i].forks_count)
            document.getElementById("repoReturn").innerHTML += `<div class="reposResult"><li><span>${outputRepo[i].name}</span><span><i class="fa fa-star" aria-hidden="true"></i><span style="padding-right: 4px">${outputRepo[i].stargazers_count}</span><i class="fa fa-code-fork" aria-hidden="true"></i><span>${outputRepo[i].forks_count}</span></div>
            </li></div>`
        }

    } else if (userCall.status == 404) {
        alert("The Profile you're searching for doesn't exist")
    }
}
