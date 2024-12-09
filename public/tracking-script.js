(function () {
  ("use strict");
  var location = window.location;
  var documents = window.document;
  var scriptElement = documents.currentScript;
  var dataDomain = scriptElement.getAttribute("data-domain");

  let queryString = location.search;
  const params = new URLSearchParams(queryString);
  var source = params.get("utm");

  var endpoint = "https://insite-metrics.vercel.app/api/track";

  function generateSessionId() {
    return "session-" + Math.random().toString(36).substring(2, 9);
  }

  function initializeSession() {
    var sessionId = localStorage.getItem("session_id");
    var expirationTimestamp = localStorage.getItem(
      "session_expiration_timestamp"
    );

    if (!sessionId || !expirationTimestamp) {
      sessionId = generateSessionId();

      // SET EXPIRATION TIME STAMP
      expirationTimestamp = Date.now() + 10 * 60 * 1000;

      localStorage.setItem("session_id", sessionId);
      localStorage.setItem("session_expiration_timestamp", expirationTimestamp);
      trackSessionStart();
    }

    return {
      sessionId: sessionId,
      expirationTimestamp: parseInt(expirationTimestamp),
    };
  }

  function isSessionExpired(expirationTimestamp) {
    return Date.now() >= expirationTimestamp;
  }

  function checkSessionStatus() {
    var session = initializeSession();

    if (isSessionExpired(session.expirationTimestamp)) {
      localStorage.removeItem("session_id");
      localStorage.removeItem("session_expiration_timestamp");

      trackSessionEnd();
      initializeSession();
    }
  }

  checkSessionStatus();

  function trigger(eventName, options) {
    const payload = {
      event: eventName,
      url: location.href,
      domain: dataDomain,
      source,
    };

    sendRequest(payload, options);
  }

  function sendRequest(payload, options) {
    var request = new XMLHttpRequest();
    request.open("POST", endpoint, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        options && options.callback && options.callback();
      }
    };
    request.send(JSON.stringify(payload));
  }

  // QUEUE OF TRACKING EVENTS
  var queue = (window.your_tracking && window.your_tracking.q) || [];
  window.your_tracking = trigger;

  for (let i = 0; i < queue.legnth; i++) {
    trigger.apply(this, queue[i]);
  }

  // FUNCTION TO TRACK PAGE VIEWS
  function trackPageView() {
    trigger("pageview");
  }
  function trackSessionStart() {
    trigger("session_start");
  }
  function trackSessionEnd() {
    trigger("session_end");
  }

  trackPageView();

  var initialPathName = window.location.pathname;
  window.addEventListener("popstate", trackPageView);
  window.addEventListener("hashchange", trackPageView);
  documents.addEventListener("click", function (event) {
    setTimeout(() => {
      if (window.location.pathname !== initialPathName) {
        trackPageView();
        initialPathName = window.location.pathname;
      }
    }, 3000);
  });
})();
