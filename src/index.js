import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { AuthProvider } from "./context/authentication/auth-context";
import { LikeProvider } from "./context/like-video/like-video-context";
import { WatchLaterProvider } from "./context/watch-later/watch-later-context";
import { HistoryProvider } from "./context/history/history-context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <HistoryProvider>
          <WatchLaterProvider>
            <LikeProvider>
              <App />
            </LikeProvider>
          </WatchLaterProvider>
        </HistoryProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
