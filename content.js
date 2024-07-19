console.log("Content script is running.");

window.addEventListener("load", () => {
  console.log("All window resources finished loading");

  // Function to access the sidebar elements
  function accessSideBar() {
    const sideBars = document.getElementsByClassName("flexlayout__tab");
    if (sideBars.length == 0) {
      console.log("Sidebar not found.");
      return false;
    }
    const sideBar = sideBars[0];
    const leetcodeElements = sideBar
      ?.querySelector("div")
      ?.querySelector("div")?.children;

    if (!leetcodeElements) {
      console.log("Leetcode sidebar elements not found.");
      return false;
    }

    const headline = leetcodeElements.item(0)?.textContent;
    const difficulty = leetcodeElements
      .item(1)
      ?.querySelector("div")?.textContent;

    let topics = null;
    function checkForLeetcodeTopics() {
      topics = leetcodeElements.item(3).getElementsByTagName("a");
      if (topics.length > 0) {
        topics = [...topics].map((topic) => topic.innerText);
        console.log("topics: ", topics);
      } else {
        console.log("Tags not found, retrying...");
        return setTimeout(checkForLeetcodeTopics, 100); // Retry after 100ms
      }
    }
    checkForLeetcodeTopics();

    console.log("headline: ", headline);
    console.log("difficulty: ", difficulty);
    console.log(topics);

    return true;
  }

  if (!accessSideBar()) {
    const observer = new MutationObserver((mutations, obs) => {
      if (accessSideBar()) {
        obs.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }
});

console.log("Content script finished loading.");
