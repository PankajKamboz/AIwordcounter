// Toggle visibility of the dropdown menu
function toggleCaseDropdown() {
    var dropdown = document.getElementById("caseDropdown");
    dropdown.classList.toggle("show");
}

// Change the case of the text in the textarea
function changeCase(caseType) {
    var inputText = document.getElementById("inputText");
    var text = inputText.value;

    switch (caseType) {
        case 'sentence':
            inputText.value = toSentenceCase(text);
            break;
        case 'title':
            inputText.value = toTitleCase(text);
            break;
        case 'uppercase':
            inputText.value = text.toUpperCase();
            break;
        case 'lowercase':
            inputText.value = text.toLowerCase();
            break;
    }
    document.getElementById("caseDropdown").classList.remove("show");
    updateWordCountAndFreq(); // Update after case change
}

// Convert text to Sentence case
function toSentenceCase(str) {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, match => match.toUpperCase());
}

// Convert text to Title case
function toTitleCase(str) {
    return str.replace(/\b([a-z]+)/g, match => match.charAt(0).toUpperCase() + match.slice(1));
}

// Update word & character count and frequency lists
function updateWordCountAndFreq() {
    var text = document.getElementById("inputText").value;

    var words = text.trim().split(/\s+/);
    var wordCount = text.trim() === "" ? 0 : words.length;
    var charCount = text.length;

    document.getElementById("wordCount").textContent = wordCount;
    document.getElementById("charCount").textContent = charCount;

    updateFrequencyList(getWordFrequency(text), "wordFrequencyList");
    updateFrequencyList(getCharacterFrequency(text), "charFrequencyList");
}

function getWordFrequency(text) {
    var words = text.trim().toLowerCase().split(/\s+/);
    return words.reduce((freq, word) => (freq[word] = (freq[word] || 0) + 1, freq), {});
}

function getCharacterFrequency(text) {
    return [...text.toLowerCase()].reduce((freq, char) => (char !== " " && (freq[char] = (freq[char] || 0) + 1), freq), {});
}

// Update the frequency list
function updateFrequencyList(frequency, listId) {
    var listElement = document.getElementById(listId);
    listElement.innerHTML = Object.entries(frequency).map(([key, val]) => `<li>${key}: ${val}</li>`).join("");
}

document.getElementById("inputText").addEventListener("input", updateWordCountAndFreq);
