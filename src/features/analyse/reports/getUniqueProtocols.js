export const getUniqueProtocols = (messages) => {
    const uniqueProtocols = new Set();

    messages.forEach((message) => {
      if (message.protocol) {
        const protocols = message.protocol.split(',');
        protocols.forEach((protocol) => {
          uniqueProtocols.add(protocol.trim());
        });
      }
    });

    return Array.from(uniqueProtocols);
  };