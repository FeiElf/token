import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {
    let owner : Principal = Principal.fromText("vlii2-7qr4e-nma3g-dqavk-6niio-nzss6-5d6dx-pbcvd-lzaxf-ldth2-wqe");
    let totalSupply : Nat = 1000000000;
    let symbol : Text = "DANG";

    private stable var balanceEntries : [(Principal, Nat)] = [];
    private var balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    if (balances.size() < 1) {
        balances.put(owner, totalSupply);
    };

    system func preupgrade() {
        balanceEntries := Iter.toArray(balances.entries());
    };

    system func postupgrade() {
        balances := HashMap.fromIter<Principal, Nat>(balanceEntries.vals(), 1, Principal.equal, Principal.hash);
        if (balances.size() < 1) {
            balances.put(owner, totalSupply);
        };
    };

    public query func balanceOf(who : Principal) : async Nat {
        let balance : Nat = switch (balances.get(who)) {
            case null 0;
            case (?result) result;
        };
        return balance;
    };

    public query func getSymbol() : async Text {
        return symbol;
    };

    public shared (msg) func payOut() : async Text {
        let owner = msg.caller;
        if (balances.get(owner) == null) {
            let amount = 10000;
            Debug.print(debug_show (owner));
            let result = await transfer(owner, amount);
            return result;
        } else {
            return "Already Claimed";
        };
    };

    public shared (msg) func transfer(to : Principal, amount : Nat) : async Text {
        let from = msg.caller;
        let fromBalance = await balanceOf(from);
        if (fromBalance >= amount) {
            balances.put(from, fromBalance - amount);
            let toBalance = await balanceOf(to);
            balances.put(to, toBalance + amount);
            return "Success";
        } else {
            return "Not enough money";
        };
    };
};
