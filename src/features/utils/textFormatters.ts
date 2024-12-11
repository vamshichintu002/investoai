interface TextItem {
  type: 'text' | 'bullet';
  content: string;
}

interface Section {
  title: string | null;
  content: TextItem[];
}

export function formatExplanationText(text: string): Section[] {
  const lines = text.split('\n').filter(line => line.trim());
  const sections: Section[] = [];
  let currentSection: Section = { title: null, content: [] };

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Skip empty lines
    if (!trimmedLine) continue;

    // Check if line is a section header
    if (trimmedLine.endsWith(':') && !trimmedLine.includes('•')) {
      // Save previous section if it has content
      if (currentSection.content.length > 0) {
        sections.push(currentSection);
      }
      currentSection = {
        title: trimmedLine.slice(0, -1),
        content: []
      };
      continue;
    }

    // Handle bullet points
    if (trimmedLine.startsWith('•')) {
      currentSection.content.push({
        type: 'bullet',
        content: trimmedLine.substring(1).trim()
      });
      continue;
    }

    // Handle key-value pairs
    if (trimmedLine.includes(':') && !trimmedLine.endsWith(':')) {
      const [key, value] = trimmedLine.split(':').map(part => part.trim());
      currentSection.content.push({
        type: 'text',
        content: `${key}: ${value}`
      });
      continue;
    }

    // Regular text
    currentSection.content.push({
      type: 'text',
      content: trimmedLine
    });
  }

  // Add the last section if it has content
  if (currentSection.content.length > 0) {
    sections.push(currentSection);
  }

  return sections;
}