sequenceDiagram
    participant browser
    participant server

    Note right of browser: Even before the request with the new note is made, we change the DOM to show the new note
    browser->>server: POST {"content": "sample spa note", "date": "2023-09-02T14:44:25.547Z"} JSON to https://studies.cs.helsinki.fi/exampleapp/new_note_spa  
    activate server
    Note left of server: The server stores the data sent into a global list variable as before
    server-->>browser: 201 HTTP code meaning resoure created
    deactivate server

    Note right of browser: No additional requests issued since we prevented the default FORM behaviour
