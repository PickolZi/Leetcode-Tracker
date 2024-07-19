const LEETCODE_API_ENDPOINT = "https://leetcode.com/graphql/";

const getProblemData = async (titleSlug, XCsrftoken, Origin, Cookie) => {
  const headers = {
    "Content-Type": "application/json",
    "X-CSRFToken": XCsrftoken,
    Origin: Origin,
    Cookie: Cookie,
  };

  const body = {
    query:
      "query getProblemDetails($titleSlug: String!) { question(titleSlug: $titleSlug) { questionId questionFrontendId title titleSlug isPaidOnly difficulty likes dislikes categoryTitle } }",
    variables: {
      titleSlug: titleSlug,
    },
  };

  try {
    const response = await fetch(LEETCODE_API_ENDPOINT, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching problem data:", error);
  }
};

const getProblemTags = async (titleSlug) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const body = {
    query:
      "query singleQuestionTopicTags($titleSlug: String!) {question(titleSlug: $titleSlug) {topicTags {name slug}}}",
    variables: {
      titleSlug: titleSlug,
    },
  };

  try {
    const response = await fetch(LEETCODE_API_ENDPOINT, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching problem data:", error);
  }
};

window.getProblemData = getProblemData;
window.getProblemTags = getProblemTags;
