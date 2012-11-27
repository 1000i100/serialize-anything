describe("Fonctions générique", function() {
    it("encodage base 64", function() {
        expect(Base64.encode('test')).toBe('dGVzdA==');
        expect(Base64.encode("it(\"encodage base 64\", function() {expect(Base64.encode('test')).toBe('dGVzdA==');expect(Base64.encode('test')).toBe('dGVzdA==');});"))
            .toBe('aXQoImVuY29kYWdlIGJhc2UgNjQiLCBmdW5jdGlvbigpIHtleHBlY3QoQmFzZTY0LmVuY29kZSgndGVzdCcpKS50b0JlKCdkR1Z6ZEE9PScpO2V4cGVjdChCYXNlNjQuZW5jb2RlKCd0ZXN0JykpLnRvQmUoJ2RHVnpkQT09Jyk7fSk7');
    });
    it("decodage base 64", function() {
        expect(Base64.decode('dGVzdA==')).toBe('test');
        expect(Base64.decode('aXQoImVuY29kYWdlIGJhc2UgNjQiLCBmdW5jdGlvbigpIHtleHBlY3QoQmFzZTY0LmVuY29kZSgndGVzdCcpKS50b0JlKCdkR1Z6ZEE9PScpO2V4cGVjdChCYXNlNjQuZW5jb2RlKCd0ZXN0JykpLnRvQmUoJ2RHVnpkQT09Jyk7fSk7'))
            .toBe("it(\"encodage base 64\", function() {expect(Base64.encode('test')).toBe('dGVzdA==');expect(Base64.encode('test')).toBe('dGVzdA==');});");
    });
});


function serialisationTest(testValue){
        var donneeDeTest = testValue;
        var temoin = donneeDeTest;
        var donneeConvertieEnTexte = serialize(donneeDeTest);
        expect(typeof donneeConvertieEnTexte).toBe('string');
        var donneeRestauree = deserialize(donneeConvertieEnTexte);
        expect(donneeRestauree).toBe(temoin);    
}
function serialisationTestFonction(testFunction, params){
        var donneeDeTest = testFunction;
        var temoin = donneeDeTest;
        var donneeConvertieEnTexte = serialize(donneeDeTest);
        expect(typeof donneeConvertieEnTexte).toBe('string');
        var donneeRestauree = deserialize(donneeConvertieEnTexte);
        expect(donneeRestauree(params)).toBe(temoin(params));    
}
describe("serialisation / déserialisation", function() {
    it("gère les entiers", function() {
        serialisationTest(5);
        serialisationTest(-6548854821486);
    });
    it("gère les flotants", function() {
        serialisationTest(.2);
        serialisationTest(-654.00099);
    });
    it("gère les chaines de caractères", function() {
        serialisationTest('a');
        serialisationTest("une chaine avec des caractères un peu plus compiqué comme : \"/'()&$£¤*!§?²@ëâ<>{}[]| et qui à le mauvais gout de finir par \\");
    });
    it("gère les booléens", function() {
        serialisationTest(true);
        serialisationTest(false);
    });
    it("gère les undefined", function() {
        serialisationTest(undefined);
    });
    it("gère les null", function() {
        serialisationTest(null);
    });
    it("gère les fonctions", function() {
        serialisationTestFonction(function(){return 5;});
        function incrementeur(num){return num+1;}
        serialisationTestFonction(incrementeur,5);
        
        console.log(serialize(Math.round));
        serialisationTestFonction(Math.round,0.5);
    });
    
    

/*
    it("serialise les tableaux", function() {
        var donneeDeTest = new Array(1, 5, 3);
        donneeDeTest['clef']='valeur';
        var temoin = donneeDeTest;
        var donneeConvertieEnTexte = serialise(donneeDeTest);
        console.log(donneeConvertieEnTexte);
        var donneeRestauree = deserialise(donneeConvertieEnTexte);
        expect(donneeRestauree[0]).toBe(temoin[0]);
        expect(donneeRestauree[1]).toBe(temoin[1]);
        expect(donneeRestauree[2]).toBe(temoin[2]);
        expect(donneeRestauree['clef']).toBe(temoin['clef']);
    });
    it("déserialise les tableaux", function() {
        var donneeDeTest = new Array(1, 5, 3);
        donneeDeTest['clef']='valeur';
        var temoin = donneeDeTest;
        var donneeConvertieEnTexte = serialise(donneeDeTest);
        console.log(donneeConvertieEnTexte);
        var donneeRestauree = deserialise(donneeConvertieEnTexte);
        expect(donneeRestauree[0]).toBe(temoin[0]);
        expect(donneeRestauree[1]).toBe(temoin[1]);
        expect(donneeRestauree[2]).toBe(temoin[2]);
        expect(donneeRestauree['clef']).toBe(temoin['clef']);
    });
*/
});
