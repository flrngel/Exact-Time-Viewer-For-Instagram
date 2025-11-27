// Displays exact Instagram timestamps by replacing the relative text inside <time> elements.
(() => {
  const APPLIED_DATETIME = 'exactTimeViewerDatetime';

  const formatDateTime = (isoString) => {
    const parsedDate = new Date(isoString);

    if (Number.isNaN(parsedDate.getTime())) {
      return null;
    }

    return new Intl.DateTimeFormat(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    }).format(parsedDate);
  };

  const updateTimeElement = (timeElement) => {
    if (!(timeElement instanceof HTMLElement)) {
      return;
    }

    const datetime = timeElement.getAttribute('datetime');

    if (!datetime || timeElement.dataset[APPLIED_DATETIME] === datetime) {
      return;
    }

    const formatted = formatDateTime(datetime);

    if (!formatted) {
      return;
    }

    if (!timeElement.dataset.originalExactTimeLabel) {
      timeElement.dataset.originalExactTimeLabel = timeElement.textContent || '';
    }

    timeElement.dataset[APPLIED_DATETIME] = datetime;
    timeElement.textContent = formatted;
    timeElement.title = formatted;
    timeElement.setAttribute('aria-label', formatted);
  };

  const processNode = (node) => {
    if (!(node instanceof HTMLElement)) {
      return;
    }

    if (node.tagName === 'TIME') {
      updateTimeElement(node);
    }

    node.querySelectorAll('time[datetime]').forEach(updateTimeElement);
  };

  const observeDom = () => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.target instanceof HTMLElement) {
          if (mutation.target.tagName === 'TIME') {
            updateTimeElement(mutation.target);
          }
        }

        mutation.addedNodes.forEach((addedNode) => {
          processNode(addedNode);
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['datetime']
    });
  };

  const start = () => {
    processNode(document.body);
    observeDom();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
