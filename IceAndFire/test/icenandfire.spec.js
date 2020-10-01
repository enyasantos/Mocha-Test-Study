/*
    => Arquivos de teste tem que ter a extensão .spec.js
*/

const chai = require('chai');
const expect = chai.expect;
const IceAndFire = require('../src/icenandfire');

describe("Game of Thrones lib", () => {
    describe("Game of Thrones Character", () => {
        it("name jhon snow", async () => {            
            const { name } = await IceAndFire.infoCharacter(583);
            expect(name).to.equal('Jon Snow');
        });
        it("titles jhon snow", async () => {
            const { titles } = await IceAndFire.infoCharacter(583);
            const newTitles = [ "Lord Commander of the Night's Watch" ];
            expect(titles).to.eql(newTitles);
        })
    });
    describe("Game of Thrones Book", () => {
        it("name A Clash of Kings", async () => {            
            const { name } = await IceAndFire.infoBook(2);
            expect(name).to.equal('A Clash of Kings');
        });
    });
});