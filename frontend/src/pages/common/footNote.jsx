
    const FootNote = () => {
        return (
            <footer className="footer bg-neutral text-neutral-content p-6 justify-center items-center">
                <aside className="mr-12">
                    <img
                        src="../src/pages/common/svgs/cube.svg"  // path relative to the public folder
                        alt="Custom Icon"
                        width={50}
                        height={50}
                    />
                    <p>
                    A Cubed Industries Ltd.
                    <br />
                    Providing reliable software since 2025
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Social</h6>
                    <div className="grid grid-flow-col gap-4">
                    <a href="https://github.com/Abilash-Sivasith">
                        <img
                            src="../src/pages/common/svgs/github-mark-white.svg"
                            alt="Custom Icon"
                            width={30}
                            height={30}
                        />
                    </a>
                    </div>
                </nav>
                </footer>
        )
    }

    export default FootNote