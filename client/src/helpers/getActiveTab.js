export const getActiveTab = url => {
  const tabs = ['inbox', 'today', 'next-week', 'label', 'project']
  const activeTab = tabs.find(tab => url.includes(tab))

  return activeTab
}
