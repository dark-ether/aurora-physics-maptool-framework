[h:broadcast("ran onFirstInit")]
[h: libPath = "aurora.physics.plus"]
<!-- setting the translation objects-->
[h: english = data.getStaticData(libPath,"public/english.json")]
[h: setLibProperty("translation.english",english)]
[h: portugues = data.getStaticData(libPath,"public/portugues.json")]
[h: setLibProperty("translation.portugues",portugues)]
