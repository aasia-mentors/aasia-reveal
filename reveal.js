var $maparea;
// var $img;
var $mapimage;

$('.mapclick').on('click', function() {
    $maparea = $(this).attr('id');
    switch ($maparea) {
        case ('mapfull'):
            toggleMap();
            toggleText();
            break;
        case ('mapkey'):
            toggleKeys();
            break;
        default:
            break;
    }
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

var $building;
var $riddles = {
    "ally": "Elementary, middle school, high school and more, you belong to a group since you’ve been here and more. The path you travel after as someone who’s been there. Be the one who “finds” the new world and be on the road.",
    "jc": ".- ..- - --- -.-. .- -.. --..-- / .-.. .- ... . .-. / -.-. ..- - - . .-. ... --..-- / .- -. -.. / .- .-.. .-.. -....- -. .. --. .... - . .-. / ... - .-. .- .. -. -....- / .- - / .-.. . .- ... - / -.-- --- ..- / .-- --- -. .----. - / -- .. ... ... / -.-- --- ..- .-. / - .-. .- .. -. .-.-.-",
    "jocelyn": ".- ..- - --- -.-. .- -.. --..-- / .-.. .- ... . .-. / -.-. ..- - - . .-. ... --..-- / .- -. -.. / .- .-.. .-.. -....- -. .. --. .... - . .-. / ... - .-. .- .. -. -....- / .- - / .-.. . .- ... - / -.-- --- ..- / .-- --- -. .----. - / -- .. ... ... / -.-- --- ..- .-. / - .-. .- .. -. .-.-.-",
    "brandon": "What’s special about this place? It’s where Bouve students go<br>Or ideal for dance practice with open lobbies and ceilings not too low.<br>Big lecture halls for CS, cool lab space to go in depth,<br>Oh yeah, and it’s also real near West Village F.<br>You might find me here just vibing, or seeing my adviser,<br>Let’s meet up quickly; I’m excited to be your mentor!",
    "huiyun": "Bright lights in your eyes, not a face to be seen, this is where stories are told",
    "aaron": "Row, row, row your boat! Runners, take your mark, GO! Splish splash in a 50 meter pool. I'm your home if you're really good at running and swimming and other indoor athletic activities",
    "jamie": "Kpop? Fan dance? Tinikling? If you like moving your body to music, you might find yourself in a practice studio in this building!",
    "amy": "Metal mascot standing tall, find me dancing at&nbsp;&nbsp;_ _ _&nbsp;&nbsp;&nbsp;_ _ _ _",
    "thaovy": "What did one charged atom say to the other? I got my ion you! You're the one I've got MY eye on this year :)",
    "thao-vy": "What did one charged atom say to the other? I got my ion you! You're the one I've got MY eye on this year :)",
    "ruiming": "Reflections to the East, rust to the West.<br>But I'm rarely here, unless it is to impress a guest.<br>There's glass, and coffee, and thinkers too.<br>Meet me on the sixth floor, to enjoy the view :-')",
    "hayeong": "It's right on the corner of pleasure and pain.<br>As long as you run here just stay in your lane.<br>It's really close by, you wont need a Lyft,<br>but as soon as you come here, that plan might shift!<br>Some people just come here, late, late at night.<br>But as long as you make, it it's good for you, right?<br>While it looks different than years in the past,<br>still hopefully somehow the gains made will last.<br>Right now its weird, and that's with no doubt.<br>But some day in the future, things will work out. :)",
    "andy": "This building is the oldest of its kind in the United States",
    "andrew": "This building is the oldest of its kind in the United States",
    "megan": "If i was a worm that never died, you would find me here in room 409 of this building :^)",
    "emi": "Michelle Phan, Hasan Minaj, and Steve Aoki would probably all hang here if they attended NEU",
    "emiko": "Michelle Phan, Hasan Minaj, and Steve Aoki would probably all hang here if they attended NEU",
    "noor": "Center of campus, center of mind,<br>walk 'cross rust bridge to see who you can find.<br>maybe they're behind a tree, maybe they're not,<br>but one thing's for sure—they're kinda far from any parking lot.<br>go into the building and what will you see?<br>a building of tech advisors, professors, and workshops, yippee",
    "sonya": "Center of campus, center of mind, walk 'cross rust bridge to see who you can find. maybe they're behind a tree, maybe they're not, but one thing's for sure—they're kinda far from any parking lot. go into the building and what will you see? a building of tech advisors, professors, and workshops, yippee",
    "xinyu": "Come to cry, leave at dawn. Most of your will to live is gone.",
    "ricky": "3 14 11 26 14 11 24 5 21 1 24 11 7 13 7 19 11 24 21 24 8 1 12 12 26 14 15 25 22 18 7 9 11 3 15 18 18  19 7 17 11 5 21 1 26 21 1 13 14",
    "rickeil": "3 14 11 26 14 11 24 5 21 1 24 11 7 13 7 19 11 24 21 24 8 1 12 12 26 14 15 25 22 18 7 9 11 3 15 18 18  19 7 17 11 5 21 1 26 21 1 13 14",
    "joe": "Tray on drew aid night tin haunt in ten; sadly, I also lived here last year",
    "joseph": "Tray on drew aid night tin haunt in ten; sadly, I also lived here last year",
    "krista": "I used to live here, you could say it’s my sunRISE in the rain🤪"
};

var $name = document.getElementById("name");
var $riddle;
var $submitButton = document.getElementById("submitButton");

if ($name) {
    // checks what the password is once user presses enter
    $name.addEventListener("keypress", function(e) {
        var key = e.which || e.keyCode || 0;
        if (key === 13) {
            e.preventDefault();
            checkName();
        }
    });
}

if ($submitButton) {
    $submitButton.addEventListener("click", checkName);
}

function checkName() {
    $name = document.getElementById("name").value.toLowerCase().replace(/\s/g, '')
    $riddle = $riddles[$name];
    if ($riddle) {
        document.getElementById("intro").innerHTML = "<p><strong>Glad you're here, " + capitalizeFirstLetter($name) + "! 🙌🏻 </strong></p><p>Welcome to Reveal!</p><p>In order to find your mentor, use this map and the provided riddle below to figure out where they're hiding! Once you've figured out the riddle, use the key on the right to figure out the code for the building. In order to view the key better, you can click on it to display it larger and then click again to dismiss it. To get to the building your mentor is in, just click on the map below, scroll to the building you think theyre in, then click on its respective code. If you need any help, just reach out to one of us! </p><p>And now for the riddle: <b><br><p style='text-align:center'><em>" + $riddle + "</em></p></b></p><p style='text-align:right'>Best of luck!<br>~ Anisa and Tau</p>";
        var mapOverview = document.getElementById("mapoverview");
        mapOverview.style.display = "block";
    }
    var mapScreen = document.getElementById("mapscreen");
    mapScreen.style.display = "block";
    var formScreen = document.getElementById("formscreen");
    formScreen.style.display = "none";
}


$('.zoomclick').on('click', function() {
    $building = $(this).attr('id');
    switch ($building) {
        case ("alumni"):
            if ($name == "ally") {
                window.location = "ally-cp.html";
            } else {
                alert("Sorry, this isn't where your mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            }
            break;
        case ("architecture"):
            if ($name == "jc" || $name == "jocelyn") {
                window.location = "jc-as.html";
            } else {
                alert("Sorry, this isn't where your mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            }
            break;
        case ("behrakis"):
            if ($name == "brandon") {
                window.location = "brandon-bk.html";
            } else {
                alert("Sorry, this isn't where your mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            }
            break;
        case ("cabot"):
            if ($name == "aaron") {
                window.location = "aaron-cb.html";
            } else {
                alert("Sorry, this isn't where your mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            }
            break;
        case ("blackman"):
            if ($name == "huiyun") {
                window.location = "huiyun-bl.html";
            } else {
                alert("Sorry, this isn't where your mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            }
            break;
        case ("ell"):
            if ($name == "amy") {
                window.location = "amy-el.html";
            } else {
                alert("Sorry, this isn't where your mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            }
            break;
        case ("curry"):
            if ($name == "jamie") {
                window.location = "jamie-csc.html";
            } else {
                alert("Sorry, this isn't where your mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            }
            break;
        case ("isec"):
            if ($name == "ruiming") {
                window.location = "ruiming-isec.html";
            } else {
                alert("Sorry, this isn't where your mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            }
            break;
        case ("hurtig"):
            if ($name == "thaovy" || $name == "thao-vy") {
                window.location = "thaovy-ht.html";
            } else {
                alert("Sorry, this isn't where your mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            }
            break;
        case ("matthews"):
            if ($name == "andy" || $name == "andrew") {
                window.location = "andy-ma.html";
            } else {
                alert("Sorry, this isn't where your mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            }
            break;
        case ("marino"):
            if ($name == "hayeong") {
                window.location = "hayeong-mc.html";
            } else {
                alert("Sorry, this isn't where your mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            }
            break;
        case ("mugar"):
            if ($name == "megan") {
                window.location = "megan-mu.html";
            } else {
                alert("Sorry, this isn't where your mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            }
            break;
        case ("ryder"):
            if ($name == "emi" || $name == "emiko") {
                window.location = "emi-ry.html";
            } else {
                alert("Sorry, this isn't where your mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            }
            break;
        case ("snellengineering"):
            if ($name == "noor" || $name == "sonya") {
                window.location = "noor-sn.html";
            } else {
                alert("Sorry, this isn't where your mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            }
            break;
        case ("snelllibrary"):
            if ($name == "xinyu") {
                window.location = "xinyu-sl.html";
            } else {
                alert("Sorry, this isn't where your mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            }
            break;
        case ("squashbusters"):
            if ($name == "ricky" || $name == "rickeil") {
                window.location = "ricky-sb.html";
            } else {
                alert("Sorry, this isn't where your mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            }
            break;
        case ("eastvillage"):
            if ($name == "krista") {
                window.location = "krista-ev.html";
            } else {
                alert("Sorry, this isn't where your mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            }
            break;
        case ("319"):
            if ($name == "joseph" || $name == "joe") {
                window.location = "joseph-319.html";
            } else {
                alert("Sorry, this isn't where your mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            }
            break;
        default:
            alert("Sorry, this isn't where your mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            break;
    }
});

$('.smclick').on('click', function() {
    $seniormentor = $(this).attr('id');
    switch ($seniormentor) {
        case ("winnie"):
            window.location = "winnie-l1.html";
            break;
        case ("chris"):
            window.location = "chris-r6.html";
            break;
        case ("stacey"):
            window.location = "stacey-s4.html";
            break;
        case ("sooji"):
            window.location = "sooji-p8.html";
            break;
        case ("ashley"):
            window.location = "ashley-h5.html";
            break;
        case ("anthony"):
            window.location = "anthony-w3.html";
            break;
        default:
            alert("Sorry, this isn't where your senior mentor is! If you need help, reach out to Tau or Anisa for a hint!");
            break;
    }
});


// $('.mapclick').on('click', function() {
//     $img = $(this).attr('id');
//     $mapimage = $('<div class="full-screen"><img src="./assets/campusmapzoom.png"></div>');
//     $mapimage.appendTo('.full');
// });
function toggleMap() {
    var map = document.getElementById("bigmap");
    if (map.style.display === "block") {
        map.style.display = "none";
    } else {
        map.style.display = "block";
    }
}

function toggleText() {
    var text = document.getElementById("maptext");
    if (text.style.display === "none") {
        text.style.display = "block";
    } else {
        text.style.display = "none";
    }
}

function toggleKeys() {
    var keys = document.getElementById("bigmapkeys");
    if (keys.style.display === "block") {
        keys.style.display = "none";
    } else {
        keys.style.display = "block";
    }
}

// $('.full').on('click', function() {
//     if ($mapimage) {
//         $mapimage.remove();
//         var map = document.getElementById("bigmap");
//         map.style.display = "none";
//     }
// });

$('#bigmap').on('click', function() {
    this.style.display = "none";
    toggleText();
});

$('#bigmapkeys').on('click', function() {
    this.style.display = "none";
    toggleText();
});