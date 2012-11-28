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


function serialisationTest(testValue, depthLimit){
        var donneeDeTest = testValue;
        var temoin = donneeDeTest;
        var donneeConvertieEnTexte = serialize(donneeDeTest,depthLimit);
        expect(typeof donneeConvertieEnTexte).toBe('string');
        console.log(donneeConvertieEnTexte);
        var donneeRestauree = deserialize(donneeConvertieEnTexte);
        expect(donneeRestauree).toEqual(temoin);
        return donneeRestauree;
}
function serialisationTestRecurcivite(testValue){
        var donneeDeTest = testValue;
        var donneeConvertieEnTexte = serialize(donneeDeTest);
        expect(typeof donneeConvertieEnTexte).toBe('string');
        console.log(donneeConvertieEnTexte);
        var donneeRestauree = deserialize(donneeConvertieEnTexte);
        return donneeRestauree;
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
    function serialisationTestFonction(testFunction, params){
            var donneeDeTest = testFunction;
            var temoin = donneeDeTest;
            var donneeConvertieEnTexte = serialize(donneeDeTest);
            expect(typeof donneeConvertieEnTexte).toBe('string');
            var donneeRestauree = deserialize(donneeConvertieEnTexte);
            expect(donneeRestauree(params)).toBe(temoin(params));    
    }
    it("gère les fonctions utilisateurs", function() {
        serialisationTestFonction(function(){return 5;});
        function incrementeur(num){return num+1;}
        serialisationTestFonction(incrementeur,5);
    });
    it("gère les fonctions native", function() {
        serialisationTestFonction(escape,"j'ai compris >< ");
        
        // mais pas les methode statique native
        //serialisationTestFonction(Math.round,0.5);
    });
    it("gère les tableaux simple", function() {
        serialisationTest([1,'cinq',null]);
    });
    it("gère les tableaux associatif", function() {
        var tableauAssociatif = new Array();
        tableauAssociatif['test'] = 'test';
        tableauAssociatif['un?'] = 'deux!';
        serialisationTest(tableauAssociatif);
    });
    it("gère les tableaux imbriqué/multidimensionnel/complexe", function() {
        var tableauFinal = serialisationTest([1,'cinq',[3,2,[escape,null]]]);
        expect(tableauFinal[2][2][0]('"')).toBe(escape('"'));
    });
    it("gère une limite optionnelle à la profondeur des objets serialisé", function() {
        serialisationTest([[[[[[[[[[[[5]]]]]]]]]]]]); // sans limite
        serialisationTest([[[[[[[[[[[[5]]]]]]]]]]]],13); // avec limite suffisente
        //avec limite à 3
        var donneeDeTest = [[[[[[[[[[[[5]]]]]]]]]]]];
        var temoin = donneeDeTest;
        var donneeConvertieEnTexte = serialize(donneeDeTest,3);
        expect(typeof donneeConvertieEnTexte).toBe('string');
        console.log(donneeConvertieEnTexte);
        var donneeRestauree = deserialize(donneeConvertieEnTexte);
        expect(donneeRestauree).not.toEqual(temoin);    
    });
    it("gère les références circulaire directe", function() {
        var a = new Array();
        a.push(a);
        serialisationTest(a);
    });
    
    it("gère les références circulaire indirecte", function() {
        //indirecte simple (2ème niveau).
        
        var a = new Array();
        a.push('plop')
        a.push([a]);
        var donneeRestauree = serialisationTestRecurcivite(a);
        expect(donneeRestauree[0]).toEqual('plop');
        expect(donneeRestauree[1][0][0]).toEqual('plop');
        
        // indirecte croisé
        var a = new Object();
        a.content = 'osef';
        var b = new Object();
        b.content = 'bob';
        var c = new Object();
        c.content = 'crash?';
        a.plus = b;
        a.moins = c;
        b.plus = c;
        b.moins = a;
        c.plus = a;
        c.moins = b;
        serialisationTestRecurcivite(a);
        serialisationTestRecurcivite(b);
        serialisationTestRecurcivite(c);
    });
    it("gère les expression régulière", function() {
        serialisationTest(/^$/gi);
    });
    it("gère les Dates", function() {
        serialisationTest(new Date());
    });
    /*
    it("gère les objets du DOM", function() {
        serialisationTest(window,1);
    });
    */
});
