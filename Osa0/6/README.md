[Kaavio WebSequenceDiagrams-palvelussa](https://www.websequencediagrams.com/?lz=bm90ZSBvdmVyIFNlbGFpbjoKSmF2YXNjcmlwdC1rb29kaSBww6Rpdml0dMOkw6QKbXVpc3RpaW5wYW5vbGlzdGFuCmVuZCBub3RlCgA8Bi0-UGFsdmVsaW46IEhUVFAgUE9TVCBodHRwczovL3N0dWRpZXMuY3MuaGVsc2lua2kuZmkvZXhhbXBsZWFwcC9uZXdfbm90ZV9zcGEKAIEVCgBMCQoAVwggdGFsbGVudGFhIACBCgwAgQYLAIEBCC0tPgCBVwcgeyJtZXNzYWdlIjoiAIF3BWNyZWF0ZWQifQoK&s=default)
```
note over Selain:
Javascript-koodi päivittää
muistiinpanolistan
end note
Selain->Palvelin: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
note over Palvelin:
Palvelin tallentaa muistiinpanon
end note
Palvelin-->Selain: {"message":"note created"}
```