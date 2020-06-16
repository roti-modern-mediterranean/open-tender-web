export const modalConfig = {
  updatingRevenueCenter: {
    type: 'working',
    args: { text: 'Updating location...' },
  },
  updateRequestedAt: {
    type: 'requestedAt',
    args: { forcedUpdate: true },
  },
  closed: {
    type: 'closed',
    args: {
      title: 'Location currently closed',
      msg: "We're sorry, but this location is currently closed.",
      preventClose: true,
    },
  },
}
