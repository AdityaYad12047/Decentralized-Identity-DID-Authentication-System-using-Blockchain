// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DIDRegistry {
    struct Identity {
        string did;
        address owner;
    }

    mapping(address => Identity) public identities;

    function registerDID(address _user, string memory _did) public {
        identities[_user] = Identity(_did, _user);
    }

    function getDID(address _user) public view returns (string memory, address) {
        Identity memory identity = identities[_user];
        return (identity.did, identity.owner);
    }
}