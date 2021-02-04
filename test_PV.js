
document.getElementById('inputfile')
    .addEventListener('change', function () {
        
        let fr = new FileReader();

        fr.onload = function () {
            nodes = new Map();

            console.log(this.result);
            let lines = this.result.split("\n");
            document.getElementById('output')
                .textContent = lines;
            for (line of lines) {
                let node = new Node();
                let data = line.split(" ", 4);
                node.nid = data[0];
                node.nfather = data[1];
                node.nname = data[2] + " " + (data[3] ? data[3] : "");
                localStorage.setItem(node.nid, node.nid + ";" + node.nfather + ";" + node.nname);
                nodes.set(node.nid, node);
            }
            let output = "";
            for (node of nodes.values()) {
                output += (node + "\n");
            }
            document.getElementById('output')
                .textContent = output;

            alert("File read successfully.");
        }

        try {
            fr.readAsText(this.files[0]);
        }
        catch (e) {
            alert("Error");
        }
    });

function switch2() {
    document.getElementById("input2").style.display = "block";
    document.getElementById("input3").style.display = "none";
}

function switch3() {
    document.getElementById("input3").style.display = "block";
    document.getElementById("input2").style.display = "none";
}

function submit2(x, y) {
    console.log(x + '-' + y);
    try {
        let check = Node.xFy(x, y);
        if (check) {
            document.getElementById("result").textContent = "X is father(grandfather ...) of Y.\nTrace:\n";
            Node.trace(x, y);
        } else {
            document.getElementById("result").textContent = "X is not father(grandfather ...) of Y.";
        }
    } catch (e) {
        alert("Error");
        console.log(e.message);
    }
}

function submit3(x) {
    console.log(x);
    try {
        document.getElementById("result").textContent = "Family of " + nodes.get(x).nname + ":\n";
        Node.printFamily(x);
    } catch (e) {
        console.log(e.message);
    }
}

class Node {
    constructor() {

    }

    static toNode(text) {
        console.log(text);
        if (!text)
            return "";
        let data = text.split(";");
        let node = new Node();
        node.nid = data[0];
        node.nfather = data[1];
        node.nname = data[2];
        return node;
    }

    static xFy(x, y) {
        if (y == 0)
            return false;
        let node = nodes.get(y);
        if (node.nfather == x)
            return true;
        else
            return Node.xFy(x, node.nfather);

    }

    static trace(x, y) {
        if (x != y) {
            Node.trace(x, nodes.get(y).nfather);
        }
        document.getElementById("result").textContent += nodes.get(y) + "\n";
        console.log(nodes.get(y));

    }

    static printFamily(x) {
        for (let node of nodes.values()) {
            if (node.father == x) {
                document.getElementById("result").textContent += node + "\n";
                console.log(node);
                Node.printFamily(node.id);
            }
        }
    }

    toString() {
        return this.id + '\t' + this.father + '\t' + this.name;
    }

    get nid() {
        return this.id;
    }

    set nid(id) {
        this.id = id;
    }

    get nfather() {
        return this.father;
    }

    set nfather(father) {
        this.father = father;
    }

    get nname() {
        return this.name;
    }

    set nname(name) {
        this.name = name;
    }

}