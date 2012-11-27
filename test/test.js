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

describe("serialisation / déserialisation", function() {
    it("gère les entiers", function() {
        var donneeDeTest = 5;
        var temoin = donneeDeTest;
        var donneeConvertieEnTexte = serialize(donneeDeTest);
        expect(typeof donneeConvertieEnTexte).toBe('string');
        var donneeRestauree = deserialize(donneeConvertieEnTexte);
        expect(donneeRestauree).toBe(temoin);

        var donneeDeTest = -6548854821486;
        var temoin = donneeDeTest;
        var donneeConvertieEnTexte = serialize(donneeDeTest);
        expect(typeof donneeConvertieEnTexte).toBe('string');
        var donneeRestauree = deserialize(donneeConvertieEnTexte);
        expect(donneeRestauree).toBe(temoin);
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
