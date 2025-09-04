import React, { useState } from "react";

 function App() {
  const [links, setLinks] = useState([]);
  const [url, setUrl] = useState("");

  const shortenUrl = () => {
    if (!url.trim()) return;
    const code = Math.random().toString(20).substr(2, 6);
    const newLink = {
      code,
      original: url,
      short: window.location.origin + "/#" + code,
      clicks: 0,
    };
    setLinks([...links, newLink]);
    setUrl("");
  };

  const handleVisit = (code) => {
    setLinks(links.map(link =>
      link.code === code ? { ...link, clicks: link.clicks + 1 } : link
    ));
    const found = links.find(link => link.code === code);
    if (found) window.open(found.original, "_blank");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px" }}>
      <h1>Simple URL Shortener</h1>
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ width: "70%", padding: "8px" }}
      />
      <button onClick={shortenUrl} style={{ padding: "8px", marginLeft: "10px" }}>Shorten</button>

      <h2 style={{ marginTop: "20px" }}>Your Links</h2>
      <table border="1" cellPadding="2" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Short</th>
            <th>Original</th>
            <th>Clicks</th>
            <th>Visit</th>
          </tr>
        </thead>
        <tbody>
          {links.map(link => (
            <tr key={link.code}>
              <td>{link.short}</td>
              <td>{link.original}</td>
              <td>{link.clicks}</td>
              <td><button onClick={() => handleVisit(link.code)}>Go</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App 