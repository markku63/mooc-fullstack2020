[Kaavio WebSequenceDiagrams-palvelussa](https://www.websequencediagrams.com/?lz=U2VsYWluLT5QYWx2ZWxpbjogSFRUUCBHRVQgaHR0cHM6Ly9zdHVkaWVzLmNzLmhlbHNpbmtpLmZpL2V4YW1wbGVhcHAvc3BhCgA5CC0tPgBOBjogSFRNTC1rb29kaQoAIkVtYWluLmNzcwBYFAATCQCBCUguagBTFQATBwpub3RlIG92ZXIgAIFnBwCBXAcgYWxrYWEgc3Vvcml0dGFhIEphdmFTY3JpcHQAggUGYSwKam9rYSBweXl0w6TDpCBtdWlzdGlpbnBhbm90IHAAgwIGbWVsdGEKZW5kIG5vdGUKAIF6RmRhdGEuanNvbgCDGRRbeyJjb250ZW50IjoiIiwiZGF0ZSI6IjIwMjAtMTAtMjlUMTc6MzE6MDkuOTM5WiJ9LCAuLi5dAIFvGwCBegoAgzQFanM6c3PDpCBtw6TDpHJpdGVsbHluCnRhcGFodHVtYW5rw6RzaXR0ZWxpasOkbiwgAIIhBW11b2Rvc3RhYQoAghsMaXN0YSBsaXN0YW4gagAFBQCCRQVzZW4gRE9NOmlpbgCCMQo&s=default)
```
Selain->Palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
Palvelin-->Selain: HTML-koodi
Selain->Palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
Palvelin-->Selain: main.css
Selain->Palvelin: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
Palvelin-->Selain: spa.js

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