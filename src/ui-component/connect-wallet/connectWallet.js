import { ConnectButton } from '@rainbow-me/rainbowkit'
import { Button } from '@mui/material';

function RenderConnectWalletButton({ chain, connected, account, openAccountModal, openChainModal, openConnectModal }) {

    if (!connected) {
        return (
            <Button
                variant='outlined' size="medium" onClick={openConnectModal} type="button">
                CONNECT WALLET
            </Button>
        )
    }
    if (chain.unsupported) {
        return (
            <Button variant='outlined' size="medium" onClick={openChainModal} type="button">
                Wrong network
            </Button>
        )
    }
    return (
        <div style={{ display: 'flex' }}>
            <Button variant='outlined' size="medium"
                onClick={openAccountModal}
                type="button"

            >
                {/* <UserIcon style={{ marginRight: "8px" }} /> */}
                {account.displayName}
            </Button>
        </div>
    )
}

export function ConnectWallet() {
    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted
            }) => {
                const ready = mounted
                const connected = ready
                    && (account?.address !== null && account?.address !== undefined)
                    && (chain?.id !== null && chain?.id !== undefined)
                return (
                    <div {...(!ready && {
                        'aria-hidden': true,
                        style: {
                            width: '100%',
                            opacity: 0,
                            pointerEvents: 'none',
                            userSelect: 'none'
                        }
                    })}
                    >
                        <RenderConnectWalletButton connected={connected} account={account} chain={chain} openAccountModal={openAccountModal} openChainModal={openChainModal} openConnectModal={openConnectModal} />
                    </div>
                )
            }}
        </ConnectButton.Custom>
    )
}
