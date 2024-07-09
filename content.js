function handleMutations(mutationsList, observer) {
  const leetcodeHeader = document.querySelector("div.text-title-large a");

  if (leetcodeHeader) {
    console.log("Leetcode header found: ", leetcodeHeader);

    const header = leetcodeHeader.textContent;
    console.log("Header is: ", header);

    observer.disconnect();
  }
}

const observer = new MutationObserver(handleMutations);

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

handleMutations();
