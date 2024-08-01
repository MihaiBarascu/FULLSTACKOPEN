```mermaid
sequenceDiagram

    participant browser
    participant server



    Note right of browser:  The browser takes the user input (new note)
    Note right of browser:The browser adds the new note locally and updates the view
    browser->>server:POST:https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Json
    deactivate server








```
