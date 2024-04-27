
const csrfToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE3MTQyNDI1MzB9.f_e4NQuS8x__V77YlmGqPwBsqVeJ2OpoH6Mars4sYbg';
// event subscribed by Verify Enclave
window.addEventListener("message", (event) => {
    const attestationId = event.data
    const origin = event.origin
    if (!attestationId) return
    if (attestationId.length !== 64) return
    fetch(`${window.location.protocol}//${window.location.host}/attestation`, {
        method: "POST",
        body: JSON.stringify({ attestationId, origin }),
        headers: new Headers({ 
            'content-type': 'application/json',
            'x-csrf-token': csrfToken
        })
    })
})
// token is valid for 1 hour, refresh every 55 minutes by reloading
window.addEventListener("load", async () => {
    setInterval(() => {
        window.location.reload()
    }, 1000 * 60 * 55)
})

// notify the SDK that the iframe is ready
window.parent.postMessage("verify_ready", "*")
