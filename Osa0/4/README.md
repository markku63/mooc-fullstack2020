[Kaavio WebSequenceDiagrams-palvelussa](https://www.websequencediagrams.com/?lz=U2VsYWluLT5QYWx2ZWxpbjogSFRUUCBQT1NUIGh0dHBzOi8vc3R1ZGllcy5jcy5oZWxzaW5raS5maS9leGFtcGxlYXBwL25ld19ub3RlCm5vdGUgb3ZlciAARwoAUwggbGlpdHTDpMOkIG11aXN0aWlucGFub24gbGlzdGFhbgoKAH0ILS0-AIESBjogVXVkZWxsZWVub2hqYXVzIHNpdnVsbGUgAHMLcy9ub3RlcwoAgTQXR0UAgR0tAEYFAHYTSFRNTC1rb29kaQAjRm1haW4uY3MAVxUAEwkAIEpqAE8aanMKAIMtCwCCcgcAgkcHIGFsa2FhIHN1b3JpdHRhYSBKYXZhU2NyaXB0AIIHBmEsCmpva2EgcHl5AINJEnQgcACEUQZtZWx0YQplbmQgAIQhBQCCZUZkYXRhLmpzb24AhCQUW3siY29udGVudCI6IiIsImRhdGUiOiIyMDIwLTEwLTI5VDE3OjMxOjA5LjkzOVoifSwgLi4uXQCBbxsAgXoKAIJKBzpzc8OkIG3DpMOkcml0ZWxseW4KdGFwYWh0dW1hbmvDpHNpdHRlbGlqw6RuLCAAgiEFbXVvZG9zdGFhCgCFdgxpc3RhAIV_Bm4gagAFBQCGIAVzZW4gRE9NOmlpbgCCMgk&s=default)
```
Selain->Palvelin: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note
note over Palvelin: Palvelin liittää muistiinpanon listaan

Palvelin-->Selain: Uudelleenohjaus sivulle /exampleapps/notes
Selain->Palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/notes
Palvelin-->Selain: HTML-koodi
Selain->Palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
Palvelin-->Selain: main.css
Selain->Palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
Palvelin-->Selain: main.js

note over Selain:
Selain alkaa suorittaa JavaScript-koodia,
joka pyytää muistiinpanot palvelimelta
end note

Selain->Palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
Palvelin-->Selain: [{"content":"","date":"2020-10-29T17:31:09.939Z"}, ...]

note over Selain:
Selain suorittaa main.js:ssä määritellyn
tapahtumankäsittelijän, joka muodostaa
muistiinpanoista listan ja lisää sen DOM:iin
end note
```